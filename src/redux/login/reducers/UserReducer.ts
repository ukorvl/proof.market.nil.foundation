/**
 * @file Reducer.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

import { createReducer } from '@reduxjs/toolkit';
import { UserBalance } from 'src/models';
import { UpdateUserBalance, UpdateUserName } from '../actions';

/**
 * State.
 */
export type UserReducerState = {
    name: string | null;
    balance?: UserBalance;
};

/**
 * Initial state.
 */
const initialState: UserReducerState = {
    name: null,
    balance: undefined,
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
