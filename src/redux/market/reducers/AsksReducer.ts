/**
 * @file Reducer.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

import { createReducer } from '@reduxjs/toolkit';
import { Ask } from 'src/models';
import { UpdateAsksList, AddAsk } from '../actions';

/**
 * State.
 */
export type AsksReducerState = {
    asks: Ask[];
};

/**
 * Initial state.
 */
const initialState: AsksReducerState = {
    asks: [],
};

/**
 * Reducer of asks.
 */
export const AsksReducer = createReducer(initialState, builder =>
    builder
        .addCase(UpdateAsksList, (state, { payload }) => ({
            ...state,
            asks: payload,
        }))
        .addCase(AddAsk, (state, { payload }) => ({
            ...state,
            asks: { ...state.asks, payload },
        })),
);
