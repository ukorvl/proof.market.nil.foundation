/**
 * @file Redux saga.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

import { call, put, takeLatest } from 'redux-saga/effects';
import { SagaIterator } from '@redux-saga/core';
import { getAsks } from 'src/api';
import { Ask } from 'src/models';
import { UpdateCircuitsList, UpdateAsksList } from '../actions';

/**
 * Asks main saga.
 *
 * @yields
 */
export function* AsksSaga(): SagaIterator<void> {
    yield takeLatest(UpdateCircuitsList, GetAsksSaga);
}

/**
 * Get asks saga.
 *
 * @yields
 */
function* GetAsksSaga(): SagaIterator<void> {
    try {
        const asks: Ask[] = yield call(getAsks);

        if (asks !== undefined) {
            yield put(UpdateAsksList(asks));
        }
    } catch (e) {
        // Do nothing
    }
}
