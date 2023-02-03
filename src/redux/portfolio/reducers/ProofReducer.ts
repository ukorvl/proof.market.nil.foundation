/**
 * @file Reducer.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

import { createReducer } from '@reduxjs/toolkit';
import type { Proof } from 'src/models';
import {
    UpdateIsLoadingProofs,
    UpdateProofList,
    UpdateProofsError,
    UpdateSelectedProofKey,
} from '../actions';

/**
 * State.
 */
export type ProofReducerState = {
    proofs: Proof[];
    isLoadingProofs: boolean;
    error: boolean;
    selectedProofKey?: string;
};

/**
 * Initial state.
 */
const initialState: ProofReducerState = {
    proofs: [],
    isLoadingProofs: false,
    error: false,
    selectedProofKey: undefined,
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
        }))
        .addCase(UpdateSelectedProofKey, (s, { payload }) => {
            if (s.proofs.some(x => x._key === payload)) {
                s.selectedProofKey = payload;
            }
        }),
);
