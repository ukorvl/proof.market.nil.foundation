/**
 * @file Redux saga.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

import { call, put, fork, delay } from 'redux-saga/effects';
import { SagaIterator } from '@redux-saga/core';
import { UpdateCircuitsError, UpdateCircuitsList, UpdateIsLoadingCircuits } from '../actions';
import { getCircuits } from '../../../api';
import { Circuit } from '../../../models';

const revalidateCurcuitsInterval = process.env.REACT_APP_UPDATE_CIRCUITS_INFO_INTERVAL;

/**
 * Circuits main saga.
 *
 * @yields
 */
export function* CircuitsSaga(): SagaIterator<void> {
    yield fork(GetCircuitsSaga);
}

/**
 * Get circuits saga.
 *
 * @yields
 */
function* GetCircuitsSaga(): SagaIterator<void> {
    while (true) {
        console.log('hahah');
        try {
            yield put(UpdateIsLoadingCircuits(true));
            const circuitsList: Circuit[] | undefined = yield call(getCircuits);

            if (circuitsList !== undefined) {
                yield put(UpdateCircuitsList(circuitsList));
            }

            yield put(UpdateIsLoadingCircuits(false));
        } catch (e) {
            yield put(UpdateIsLoadingCircuits(false));
            if (e instanceof Error) {
                yield put(UpdateCircuitsError(e));
            }
        }

        yield delay(Number(revalidateCurcuitsInterval));
    }
}
