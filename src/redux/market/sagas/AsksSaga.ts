/**
 * @file Redux saga.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

import { call, delay, fork, put, select, takeLatest } from 'redux-saga/effects';
import { SagaIterator } from '@redux-saga/core';
import { getAsks } from 'src/api';
import { Ask } from 'src/models';
import { ProtectedApiCall } from 'src/redux';
import {
    UpdateCircuitsList,
    UpdateAsksList,
    UpdateIsLoadingAsks,
    UpdateAsksError,
} from '../actions';
import { selectCurrentUser } from '../../login';

const revalidateAsksDelay = Number(process.env.REACT_APP_UPDATE_ORDER_BOOK_INTERVAL) || 3000;

/**
 * Asks main saga.
 *
 * @yields
 */
export function* AsksSaga(): SagaIterator<void> {
    yield takeLatest(UpdateCircuitsList, GetAsksSaga);
    yield fork(RevalidateAsksSaga);
}

/**
 * Get asks saga.
 *
 * @yields
 */
function* GetAsksSaga(): SagaIterator<void> {
    try {
        yield put(UpdateAsksError(false));
        yield put(UpdateIsLoadingAsks(true));

        const asks: Ask[] = yield call(ProtectedApiCall, getAsks);

        if (asks !== undefined) {
            yield put(UpdateAsksList(asks));
        }
    } catch (e) {
        yield put(UpdateAsksError(true));
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
        const user: string | null = yield select(selectCurrentUser);

        if (!user) {
            return;
        }

        yield fork(GetAsksSaga);
        yield delay(revalidateAsksDelay);
    }
}
