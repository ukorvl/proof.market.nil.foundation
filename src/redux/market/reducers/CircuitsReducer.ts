/**
 * @file Reducer.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

import { createReducer } from '@reduxjs/toolkit';
import { Circuit } from '../../../models';
import {
    UpdateCircuitsList,
    UpdateSelectedid
} from '../actions';

/**
 * State.
 */
export type CircuitsReducerState = {
    circuits: Circuit[];
    selectedid?: string;
};

/**
 * Initial state.
 */
const initialState: CircuitsReducerState = {
    circuits: [],
    selectedid: undefined,
};

/**
 * Reducer of circuits.
 */
export const CircuitsReducer = createReducer(initialState, builder =>
    builder
        .addCase(UpdateCircuitsList, (state, { payload }) => ({
            ...state,
            circuits: payload
        }))
        .addCase(UpdateSelectedid, (state, { payload }) => ({
            ...state,
            selectedid: payload
        }))
);
