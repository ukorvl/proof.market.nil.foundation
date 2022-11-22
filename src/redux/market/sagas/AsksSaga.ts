/**
 * @file Redux saga.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

import { call, fork, put, takeLatest } from 'redux-saga/effects';
import { SagaIterator } from '@redux-saga/core';
import { getAsks } from 'src/api';
import { Ask } from 'src/models';
import { ProtectedCall } from 'src/redux';
import {
    UpdateCircuitsList,
    UpdateAsksList,
    UpdateIsLoadingAsks,
    UpdateAsksError,
} from '../actions';
import { RevalidateSaga } from '../../common';

const revalidateAsksDelay = Number(process.env.REACT_APP_UPDATE_ORDER_BOOK_INTERVAL) || 3000;

/**
 * Asks main saga.
 *
 * @yields
 */
export function* AsksSaga(): SagaIterator<void> {
    yield takeLatest(UpdateCircuitsList, GetAsksSaga);
    yield fork(RevalidateSaga, GetAsksSaga, revalidateAsksDelay);
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

        const asks: Ask[] = yield call(ProtectedCall, getAsks);

        if (asks !== undefined) {
            yield put(UpdateAsksList(asks));
        }
    } catch (e) {
        yield put(UpdateAsksError(true));
    } finally {
        yield put(UpdateIsLoadingAsks(false));
    }
}
