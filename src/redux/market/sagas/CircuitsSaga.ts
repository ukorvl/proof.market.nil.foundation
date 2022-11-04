/**
 * @file Redux saga.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

import { call, put, select, takeLatest } from 'redux-saga/effects';
import { SagaIterator } from '@redux-saga/core';
import { getCircuits } from 'src/api';
import { Circuit } from 'src/models';
import {
    UpdateCircuitsError,
    UpdateCircuitsList,
    UpdateIsLoadingCircuits,
    UpdateSelectedCircuitId,
} from '../actions';
import { RootStateType } from '../../RootStateType';
import { ProtectedApiCall, UpdateUser } from '../../login';
import { selectCurrentCircuitId } from '../selectors';

const selectUser = (s: RootStateType) => s.userState.user;

/**
 * Circuits main saga.
 *
 * @yields
 */
export function* CircuitsSaga(): SagaIterator<void> {
    yield takeLatest(UpdateUser, GetCircuitsSaga);
    yield takeLatest(UpdateCircuitsList, SelectCircuitSaga);
}

/**
 * Get circuits saga.
 *
 * @yields
 */
function* GetCircuitsSaga(): SagaIterator<void> {
    const user: ReturnType<typeof selectUser> = yield select(selectUser);

    if (!user) {
        return;
    }

    try {
        yield put(UpdateIsLoadingCircuits(true));
        yield put(UpdateCircuitsError(false));

        const circuitsList: Circuit[] = yield call(ProtectedApiCall, getCircuits);

        if (circuitsList !== undefined) {
            yield put(UpdateCircuitsList(circuitsList));
        }
    } catch (e) {
        yield put(UpdateCircuitsError(true));
    } finally {
        yield put(UpdateIsLoadingCircuits(false));
    }
}

/**
 * Selects first circuit in list after circuits list update (if none is selected).
 *
 * @param {ReturnType<typeof UpdateCircuitsList>} action - Action.
 * @yields
 */
function* SelectCircuitSaga({
    payload,
}: ReturnType<typeof UpdateCircuitsList>): SagaIterator<void> {
    const currentCircuitId = yield select(selectCurrentCircuitId);

    if (currentCircuitId) {
        return;
    }

    if (!payload.length) {
        return;
    }

    yield put(UpdateSelectedCircuitId(payload[0].id));
}
