/**
 * @file Reducer.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

import { createReducer } from '@reduxjs/toolkit';
import { UpdateUser } from '../actions';

/**
 * State.
 */
export type UserReducerState = {
    user: string | null;
};

/**
 * Initial state.
 */
const initialState: UserReducerState = {
    user: null,
};

/**
 * Reducer of user info.
 */
export const UserReducer = createReducer(initialState, builder =>
    builder.addCase(UpdateUser, (state, { payload }) => ({
        ...state,
        user: payload,
    })),
);
