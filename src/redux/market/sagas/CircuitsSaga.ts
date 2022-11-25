/**
 * @file Redux saga.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

import { call, put, select, takeLatest, fork, all } from 'redux-saga/effects';
import { SagaIterator } from '@redux-saga/core';
import { getCircuits, getCircuitsInfo, getCircuitsStats } from 'src/api';
import { Circuit, CircuitInfo } from 'src/models';
import {
    UpdateCircuitsError,
    UpdateCircuitsInfoList,
    UpdateCircuitsList,
    UpdateCircuitsStats,
    UpdateIsLoadingCircuits,
    UpdateIsLoadingCircuitsInfo,
    UpdateIsLoadingCircuitsStats,
    UpdateSelectedCircuitId,
} from '../actions';
import { ProtectedCall, UpdateUser } from '../../login';
import { selectCurrentCircuitId } from '../selectors';
import { RevalidateSaga } from '../../common';

const revalidateCircuitsInfoInterval =
    Number(process.env.REACT_APP_UPDATE_ORDER_BOOK_INTERVAL) || 3000;

/**
 * Circuits main saga.
 *
 * @yields
 */
export function* CircuitsSaga(): SagaIterator<void> {
    yield takeLatest(UpdateUser, GetCircuitsSaga);
    yield takeLatest(UpdateCircuitsList, SelectCircuitSaga);
    yield fork(RevalidateSaga, GetCircuitsAdditionalData, revalidateCircuitsInfoInterval);
}

/**
 * Get circuits saga.
 *
 * @param {ReturnType<typeof UpdateUser>} action Action return type.
 * @yields
 */
function* GetCircuitsSaga({ payload: user }: ReturnType<typeof UpdateUser>): SagaIterator<void> {
    if (!user) {
        return;
    }

    try {
        yield put(UpdateIsLoadingCircuits(true));
        yield put(UpdateCircuitsError(false));

        const circuitsList: Circuit[] = yield call(ProtectedCall, getCircuits);

        if (circuitsList !== undefined) {
            yield put(UpdateCircuitsList(circuitsList));
        }
    } catch {
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

/**
 * Revalidate circuits info.
 *
 * @yields
 */
function* GetCircuitsInfoSaga() {
    try {
        yield put(UpdateIsLoadingCircuitsInfo(true));
        const circutsInfo: CircuitInfo[] = yield call(ProtectedCall, getCircuitsInfo);
        yield put(UpdateCircuitsInfoList(circutsInfo));
    } catch {
        // Do nothing
    } finally {
        yield put(UpdateIsLoadingCircuitsInfo(false));
    }
}

/**
 * Revalidate circuits stats.
 *
 * @yields
 */
function* GetCircuitsStatsSaga() {
    try {
        yield put(UpdateIsLoadingCircuitsStats(true));
        const circutsStats: [] = yield call(ProtectedCall, getCircuitsStats);
        yield put(UpdateCircuitsStats(circutsStats));
    } catch {
        // Do nothing
    } finally {
        yield put(UpdateIsLoadingCircuitsStats(false));
    }
}

/**
 * Revalidate circuit additional data (info and statistics).
 *
 * @yields
 */
function* GetCircuitsAdditionalData() {
    yield all([fork(GetCircuitsInfoSaga), fork(GetCircuitsStatsSaga)]);
}
