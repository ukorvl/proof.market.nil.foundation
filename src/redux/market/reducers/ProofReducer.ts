/**
 * @file Reducer.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

import { createReducer } from '@reduxjs/toolkit';
import { Proof } from 'src/models';
import { UpdateIsLoadingProofs, UpdateProofList, UpdateProofsError } from '../actions';

/**
 * State.
 */
export type ProofReducerState = {
    proofs: Proof[];
    isLoadingProofs: boolean;
    error: boolean;
};

/**
 * Initial state.
 */
const initialState: ProofReducerState = {
    proofs: [],
    isLoadingProofs: false,
    error: false,
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
        }))
        .addCase(UpdateProofsError, (state, { payload }) => ({
            ...state,
            error: payload,
        })),
);
