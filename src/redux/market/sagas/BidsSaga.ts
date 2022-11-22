/**
 * @file Redux saga.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

import { call, fork, put, takeLatest } from 'redux-saga/effects';
import { SagaIterator } from '@redux-saga/core';
import { getBids } from 'src/api';
import { Bid } from 'src/models';
import { ProtectedCall } from 'src/redux';
import {
    UpdateCircuitsList,
    UpdateBidsList,
    UpdateIsLoadingBids,
    UpdateBidsError,
} from '../actions';
import { RevalidateSaga } from '../../common';

const revalidateBidsDelay = Number(process.env.REACT_APP_UPDATE_ORDER_BOOK_INTERVAL) || 3000;

/**
 * Bids main saga.
 *
 * @yields
 */
export function* BidsSaga(): SagaIterator<void> {
    yield takeLatest(UpdateCircuitsList, GetBidsSaga);
    yield fork(RevalidateSaga, GetBidsSaga, revalidateBidsDelay);
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

        const bids: Bid[] = yield call(ProtectedCall, getBids);

        if (bids !== undefined) {
            yield put(UpdateBidsList(bids));
        }
    } catch (e) {
        yield put(UpdateBidsError(true));
    } finally {
        yield put(UpdateIsLoadingBids(false));
    }
}
