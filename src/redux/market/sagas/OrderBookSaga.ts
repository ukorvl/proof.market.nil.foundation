/**
 * @file Redux saga.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

import { call, fork, put, takeLatest, select } from 'redux-saga/effects';
import type { SagaIterator } from '@redux-saga/core';
import type { OrderBookDataOptions } from 'src/api';
import { getOrderBookData } from 'src/api';
import { ProtectedCall } from 'src/redux';
import type { OrderBookData } from 'src/models';
import {
    UpdateSelectedCircuitKey,
    UpdateOrderBookData,
    UpdateOrderBookDataIsLoading,
    UpdateOrderBookDataError,
    UpdateOrderBookPriceStep,
} from '../actions';
import { selectCurrentCircuitKey, selectOrderBookPriceStep } from '../selectors';
import { RevalidateSaga } from '../../common';

const revalidateDataDelay = Number(process.env.REACT_APP_REVALIDATE_DATA_INTERVAL) || 3000;

/**
 * Orderbook saga.
 *
 * @yields
 */
export function* OrderBookSaga(): SagaIterator<void> {
    yield takeLatest([UpdateSelectedCircuitKey, UpdateOrderBookPriceStep], function* () {
        yield put(UpdateOrderBookData({ asks: [], bids: [] }));
        yield fork(GetOrderBookDataSaga);
    });
    yield fork(RevalidateSaga, GetOrderBookDataSaga, revalidateDataDelay);
}

/**
 * Get orderbook data saga.
 *
 * @yields
 */
function* GetOrderBookDataSaga(): SagaIterator<void> {
    const currentStatementKey: string | undefined = yield select(selectCurrentCircuitKey);
    const currentPriceStep = yield select(selectOrderBookPriceStep);
    const apiCallOptions: OrderBookDataOptions = {
        priceStep: currentPriceStep,
    };

    if (currentStatementKey === undefined) {
        return;
    }

    try {
        yield put(UpdateOrderBookDataError(false));
        yield put(UpdateOrderBookDataIsLoading(true));

        const apiCallResult: OrderBookData = yield call(
            ProtectedCall,
            getOrderBookData,
            currentStatementKey,
            apiCallOptions,
        );

        if (apiCallResult !== undefined) {
            yield put(UpdateOrderBookData(apiCallResult));
        }
    } catch (e) {
        yield put(UpdateOrderBookDataError(true));
    } finally {
        yield put(UpdateOrderBookDataIsLoading(false));
    }
}
