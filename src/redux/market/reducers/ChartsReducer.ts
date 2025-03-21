/**
 * @file Reducer.
 * @copyright Yury Korotovskikh <u.korotovskiy@nil.foundation>
 */

import { createReducer } from '@reduxjs/toolkit';
import type { Proposal } from '@/models';
import {
    UpdateChartsData,
    UpdateIsLoadingChartsData,
    UpdateIsErrorGettingChartsData,
} from '../actions';

/**
 * State.
 */
export type ChartsReducerState = {
    data: Proposal[];
    isLoading: boolean;
    hasError: boolean;
};

/**
 * Initial state.
 */
const initialState: ChartsReducerState = {
    data: [],
    isLoading: false,
    hasError: false,
};

/**
 * Reducer of charts data.
 */
export const ChartsReducer = createReducer(initialState, builder =>
    builder
        .addCase(UpdateChartsData, (state, { payload }) => {
            state.data = payload;
        })
        .addCase(UpdateIsLoadingChartsData, (state, { payload }) => {
            state.isLoading = payload;
        })
        .addCase(UpdateIsErrorGettingChartsData, (state, { payload }) => {
            state.hasError = payload;
        }),
);
