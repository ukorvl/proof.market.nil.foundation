/**
 * @file Reducer.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

import { createReducer } from '@reduxjs/toolkit';
import { UpdateUserBalance, UpdateUserName } from '../actions';

/**
 * State.
 */
export type UserReducerState = {
    name: string | null;
    balance?: number | null;
};

/**
 * Initial state.
 */
const initialState: UserReducerState = {
    name: null,
    balance: null,
};

/**
 * Reducer of user info.
 */
export const UserReducer = createReducer(initialState, builder =>
    builder
        .addCase(UpdateUserName, (state, { payload }) => {
            state.name = payload;
        })
        .addCase(UpdateUserBalance, (state, { payload }) => {
            state.balance = payload;
        }),
);
