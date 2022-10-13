/**
 * @file Redux saga.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

import { call, put, delay, select, takeLatest } from 'redux-saga/effects';
import { SagaIterator } from '@redux-saga/core';
import { cursor } from 'src/api';
import { Circuit } from 'src/models';
import { UpdateCircuitsError, UpdateCircuitsList, UpdateIsLoadingCircuits } from '../actions';
import { RootStateType } from '../../RootStateType';
import { UpdateUser } from '../../login';

const revalidateCurcuitsInterval = process.env.REACT_APP_UPDATE_CIRCUITS_INFO_INTERVAL;
const selectUser = (s: RootStateType) => s.userState.user;

/**
 * Circuits main saga.
 *
 * @yields
 */
export function* CircuitsSaga(): SagaIterator<void> {
    yield takeLatest(UpdateUser, GetCircuitsSaga);
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
        const circuitsList: Circuit[] = yield call(cursor);

        if (circuitsList !== undefined) {
            yield put(UpdateCircuitsList(circuitsList));
        }

        yield put(UpdateIsLoadingCircuits(false));
    } catch (e) {
        yield put(UpdateIsLoadingCircuits(false));
        yield put(UpdateCircuitsError(true));
    }

    yield delay(Number(revalidateCurcuitsInterval));
}
