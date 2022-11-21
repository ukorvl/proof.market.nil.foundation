/**
 * @file Redux saga.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

import { call, delay, put, select, takeLatest, fork } from 'redux-saga/effects';
import { SagaIterator } from '@redux-saga/core';
import { getCircuits, getCircuitsInfo } from 'src/api';
import { Circuit, CircuitInfo } from 'src/models';
import {
    UpdateCircuitsError,
    UpdateCircuitsInfoList,
    UpdateCircuitsList,
    UpdateIsLoadingCircuits,
    UpdateIsLoadingCircuitsInfo,
    UpdateSelectedCircuitId,
} from '../actions';
import { ProtectedApiCall, selectCurrentUser, UpdateUser } from '../../login';
import { selectCurrentCircuitId } from '../selectors';

const revalidateInterval = Number(process.env.REACT_APP_UPDATE_ORDER_BOOK_INTERVAL) || 3000;

/**
 * Circuits main saga.
 *
 * @yields
 */
export function* CircuitsSaga(): SagaIterator<void> {
    yield takeLatest(UpdateUser, GetCircuitsSaga);
    yield takeLatest(UpdateCircuitsList, SelectCircuitSaga);
    yield fork(revalidateCircuitsInfoSaga);
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

        const circuitsList: Circuit[] = yield call(ProtectedApiCall, getCircuits);

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
function* revalidateCircuitsInfoSaga() {
    while (true) {
        const user: string | null = yield select(selectCurrentUser);

        if (!user) {
            return;
        }

        try {
            yield put(UpdateIsLoadingCircuitsInfo(true));
            const circutsInfo: CircuitInfo[] = yield call(ProtectedApiCall, getCircuitsInfo);
            yield put(UpdateCircuitsInfoList(circutsInfo));
        } catch {
            // Do nothing
        } finally {
            yield put(UpdateIsLoadingCircuitsInfo(false));
        }

        yield delay(revalidateInterval);
    }
}
