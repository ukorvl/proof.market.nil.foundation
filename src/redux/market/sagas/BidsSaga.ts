/**
 * @file Redux saga.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

import { call, delay, fork, put, select, takeLatest } from 'redux-saga/effects';
import { SagaIterator } from '@redux-saga/core';
import { getBids } from 'src/api';
import { Bid } from 'src/models';
import { ProtectedApiCall } from 'src/redux';
import {
    UpdateCircuitsList,
    UpdateBidsList,
    UpdateIsLoadingBids,
    UpdateBidsError,
} from '../actions';
import { selectCurrentUser } from '../../login';

const revalidateBidsDelay = Number(process.env.REACT_APP_UPDATE_ORDER_BOOK_INTERVAL) || 3000;

/**
 * Bids main saga.
 *
 * @yields
 */
export function* BidsSaga(): SagaIterator<void> {
    yield takeLatest(UpdateCircuitsList, GetBidsSaga);
    yield fork(RevalidateBidsSaga);
}

/**
 * Get bids saga.
 *
 * @yields
 */
function* GetBidsSaga(): SagaIterator<void> {
    try {
        yield put(UpdateBidsError(false));
        yield put(UpdateIsLoadingBids(true));

        const bids: Bid[] = yield call(ProtectedApiCall, getBids);

        if (bids !== undefined) {
            yield put(UpdateBidsList(bids));
        }
    } catch (e) {
        yield put(UpdateBidsError(true));
    } finally {
        yield put(UpdateIsLoadingBids(false));
    }
}

/**
 * Revalidate asks.
 *
 * @yields
 */
function* RevalidateBidsSaga() {
    while (true) {
        const user: string | null = yield select(selectCurrentUser);

        if (!user) {
            return;
        }

        yield fork(GetBidsSaga);
        yield delay(revalidateBidsDelay);
    }
}
