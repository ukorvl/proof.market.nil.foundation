/**
 * @file Reducer.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

import { createReducer } from '@reduxjs/toolkit';
import { Proof } from 'src/models';
import {
    UpdateIsLoadingProofs,
    UpdateProofList,
    UpdateProofsError,
    UpdateSelectedProofId,
} from '../actions';

/**
 * State.
 */
export type ProofReducerState = {
    proofs: Proof[];
    isLoadingProofs: boolean;
    error: boolean;
    selectedProofId?: string;
};

/**
 * Initial state.
 */
const initialState: ProofReducerState = {
    proofs: [],
    isLoadingProofs: false,
    error: false,
    selectedProofId: undefined,
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
        .addCase(UpdateSelectedProofId, (s, { payload }) => {
            s.selectedProofId = payload;
        }),
);
