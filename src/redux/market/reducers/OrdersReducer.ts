/**
 * @file Reducer.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

import { createReducer } from '@reduxjs/toolkit';
import { Order } from 'src/models';
import { UpdateOrdersList } from '../actions';

/**
 * State.
 */
export type OrdersReducerState = {
    orders: Order[];
};

/**
 * Initial state.
 */
const initialState: OrdersReducerState = {
    orders: [],
};

/**
 * Reducer of orders.
 */
export const OrdersReducer = createReducer(initialState, builder =>
    builder.addCase(UpdateOrdersList, (state, { payload }) => ({
        ...state,
        orders: payload,
    })),
);
