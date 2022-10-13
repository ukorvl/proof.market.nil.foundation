/**
 * @file Reducer.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

import { createReducer } from '@reduxjs/toolkit';
import { Proof } from 'src/models';
import { UpdateIsLoadingProofs, UpdateProofList } from '../actions';

/**
 * State.
 */
export type ProofReducerState = {
    proofs: Proof[];
    isLoadingProofs: boolean;
};

/**
 * Initial state.
 */
const initialState: ProofReducerState = {
    proofs: [],
    isLoadingProofs: false,
};

/**
 * Reducer of proofs.
 */
export const ProofReducer = createReducer(initialState, builder =>
    builder
        .addCase(UpdateProofList, (state, { payload }) => ({
            ...state,
            proofs: payload,
        }))
        .addCase(UpdateIsLoadingProofs, (state, { payload }) => ({
            ...state,
            isLoadingProofs: payload,
        })),
);
