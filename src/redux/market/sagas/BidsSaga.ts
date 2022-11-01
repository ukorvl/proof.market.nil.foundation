/**
 * @file Redux saga.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

import { call, delay, fork, put, takeLatest } from 'redux-saga/effects';
import { SagaIterator } from '@redux-saga/core';
import { getBids } from 'src/api';
import { Bid } from 'src/models';
import {
    UpdateCircuitsList,
    UpdateBidsList,
    UpdateIsLoadingBids,
    UpdateBidsError,
} from '../actions';

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
        yield put(UpdateIsLoadingBids(true));
        const bids: Bid[] = yield call(getBids);

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
        yield fork(GetBidsSaga);
        yield delay(revalidateBidsDelay);
    }
}
