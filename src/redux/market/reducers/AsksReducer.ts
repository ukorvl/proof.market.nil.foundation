/**
 * @file Reducer.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

import { createReducer } from '@reduxjs/toolkit';
import { Ask } from 'src/models';
import {
    UpdateAsksList,
    AddAsk,
    UpdateAsksError,
    UpdateIsLoadingAsks,
    RemoveAsk,
} from '../actions';

/**
 * State.
 */
export type AsksReducerState = {
    asks: Ask[];
    isLoading: boolean;
    error: boolean;
};

/**
 * Initial state.
 */
const initialState: AsksReducerState = {
    asks: [],
    isLoading: false,
    error: false,
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
        .addCase(AddAsk, (state, { payload }) => {
            state.asks.push(payload);
        })
        .addCase(UpdateIsLoadingAsks, (state, { payload }) => ({
            ...state,
            isLoading: payload,
        }))
        .addCase(UpdateAsksError, (state, { payload }) => ({
            ...state,
            error: payload,
        }))
        .addCase(RemoveAsk, (state, { payload }) => ({
            ...state,
            asks: state.asks.filter(x => payload !== x._key),
        })),
);
