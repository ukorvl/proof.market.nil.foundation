/**
 * @file Redux saga.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

import { call, fork, put, takeLatest, select } from 'redux-saga/effects';
import type { SagaIterator } from '@redux-saga/core';
import { getAsks } from 'src/api';
import { ProtectedCall } from 'src/redux';
import type { Ask } from 'src/models';
import {
    UpdateSelectedCircuitId,
    UpdateAsksList,
    UpdateIsLoadingAsks,
    UpdateAsksError,
} from '../actions';
import { selectCurrentCircuitId } from '../selectors';
import { RevalidateSaga } from '../../common';

const revalidateAsksDelay = Number(process.env.REACT_APP_REVALIDATE_DATA_INTERVAL) || 3000;

/**
 * Asks main saga.
 *
 * @yields
 */
export function* AsksSaga(): SagaIterator<void> {
    yield takeLatest(UpdateSelectedCircuitId, function* () {
        yield put(UpdateAsksList([]));
        yield fork(GetAsksSaga);
    });
    yield fork(RevalidateSaga, GetAsksSaga, revalidateAsksDelay);
}

/**
 * Get asks saga.
 *
 * @yields
 */
function* GetAsksSaga(): SagaIterator<void> {
    const circuitId: string | undefined = yield select(selectCurrentCircuitId);

    if (circuitId === undefined) {
        return;
    }

    try {
        yield put(UpdateAsksError(false));
        yield put(UpdateIsLoadingAsks(true));

        const asks: Ask[] = yield call(ProtectedCall, getAsks, { statement_key: circuitId }, 1000);

        if (asks !== undefined) {
            yield put(UpdateAsksList(asks));
        }
    } catch (e) {
        yield put(UpdateAsksError(true));
    } finally {
        yield put(UpdateIsLoadingAsks(false));
    }
}
