/**
 * @file Reducer.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

import { createReducer } from '@reduxjs/toolkit';
import type { Location, NavigateFunction, Params } from 'react-router-dom';
import { SetLocation, SetParams, SetNavigateFunction } from '../actions';

/**
 * State.
 */
export type RouterReducerState = {
    location: Location | null;
    params: Readonly<Params<string>> | null;
    navigate: NavigateFunction | null;
};

/**
 * Initial state.
 */
const initialState: RouterReducerState = {
    location: null,
    params: null,
    navigate: null,
};

/**
 * Reducer of router state.
 */
export const RouterReducer = createReducer(initialState, builder =>
    builder
        .addCase(SetLocation, (state, { payload }) => {
            state.location = payload;
        })
        .addCase(SetParams, (state, { payload }) => {
            state.params = payload;
        })
        .addCase(SetNavigateFunction, (state, { payload }) => {
            state.navigate = payload;
        }),
);
