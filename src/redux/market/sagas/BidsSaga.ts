/**
 * @file Redux saga.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

import { call, fork, put, select, takeLatest } from 'redux-saga/effects';
import type { SagaIterator } from '@redux-saga/core';
import { getBids } from 'src/api';
import { ProtectedCall } from 'src/redux';
import type { Bid } from 'src/models';
import {
    UpdateSelectedCircuitId,
    UpdateBidsList,
    UpdateIsLoadingBids,
    UpdateBidsError,
} from '../actions';
import { selectCurrentCircuitId } from '../selectors';
import { RevalidateSaga } from '../../common';

const revalidateBidsDelay = Number(process.env.REACT_APP_REVALIDATE_DATA_INTERVAL) || 3000;

/**
 * Bids main saga.
 *
 * @yields
 */
export function* BidsSaga(): SagaIterator<void> {
    yield takeLatest(UpdateSelectedCircuitId, function* () {
        yield put(UpdateBidsList([]));
        yield fork(GetBidsSaga);
    });
    yield fork(RevalidateSaga, GetBidsSaga, revalidateBidsDelay);
}

/**
 * Get bids saga.
 *
 * @yields
 */
function* GetBidsSaga(): SagaIterator<void> {
    const circuitId: string | undefined = yield select(selectCurrentCircuitId);

    if (circuitId === undefined) {
        return;
    }

    try {
        yield put(UpdateBidsError(false));
        yield put(UpdateIsLoadingBids(true));

        const bids: Bid[] = yield call(ProtectedCall, getBids, { statement_key: circuitId }, 1000);

        if (bids !== undefined) {
            yield put(UpdateBidsList(bids));
        }
    } catch (e) {
        yield put(UpdateBidsError(true));
    } finally {
        yield put(UpdateIsLoadingBids(false));
    }
}
