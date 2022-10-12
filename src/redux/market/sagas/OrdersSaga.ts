/**
 * @file Redux saga.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

import { call, put, takeLatest } from 'redux-saga/effects';
import { SagaIterator } from '@redux-saga/core';
import { getOrders } from 'src/api';
import { Order } from 'src/models';
import { UpdateCircuitsList, UpdateOrdersList } from '../actions';

/**
 * Orders main saga.
 *
 * @yields
 */
export function* OrdersSaga(): SagaIterator<void> {
    yield takeLatest(UpdateCircuitsList, GetOrdersSaga);
}

/**
 * Get orders saga.
 *
 * @yields
 */
function* GetOrdersSaga(): SagaIterator<void> {
    try {
        const orders: Order[] = yield call(getOrders);

        if (orders !== undefined) {
            yield put(UpdateOrdersList(orders));
        }
    } catch (e) {}
}
