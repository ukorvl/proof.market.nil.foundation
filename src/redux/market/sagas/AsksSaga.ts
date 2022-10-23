/**
 * @file Redux saga.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

import { call, delay, fork, put, takeLatest } from 'redux-saga/effects';
import { SagaIterator } from '@redux-saga/core';
import { getAsks } from 'src/api';
import { Ask } from 'src/models';
import { UpdateCircuitsList, UpdateAsksList, UpdateIsLoadingAsks } from '../actions';

const revalidateAsksDelay = Number(process.env.REACT_APP_UPDATE_ORDER_BOOK_INTERVAL);

/**
 * Asks main saga.
 *
 * @yields
 */
export function* AsksSaga(): SagaIterator<void> {
    yield takeLatest(UpdateCircuitsList, GetAsksSaga);
    // yield fork(RevalidateAsksSaga);
}

/**
 * Get asks saga.
 *
 * @yields
 */
function* GetAsksSaga(): SagaIterator<void> {
    try {
        yield put(UpdateIsLoadingAsks(true));
        const asks: Ask[] = yield call(getAsks);

        if (asks !== undefined) {
            yield put(UpdateAsksList(asks));
        }
    } catch (e) {
        // Do nothing
    } finally {
        yield put(UpdateIsLoadingAsks(false));
    }
}

/**
 * Revalidate asks.
 *
 * @yields
 */
function* RevalidateAsksSaga() {
    while (true) {
        try {
            yield fork(GetAsksSaga);
        } catch (e) {
            // Do nothing.
        }

        yield delay(revalidateAsksDelay);
    }
}
