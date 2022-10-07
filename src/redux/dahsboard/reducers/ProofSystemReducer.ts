/**
 * @file Reducer.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

import { createReducer } from '@reduxjs/toolkit';
import { ProofSystem } from '../../../enums';
import { UpdateProofSystem } from '../actions';

/**
 * State.
 */
export type ProofSystemReducerState = {
    proofSystem: ProofSystem;
};

/**
 * Initial state.
 */
const initialState: ProofSystemReducerState = {
    proofSystem: ProofSystem.Placeholder,
};

/**
 * Reducer of proof system.
 */
export const ProofSystemReducer = createReducer(initialState, builder =>
    builder
        .addCase(UpdateProofSystem, (_, { payload }) => ({
            proofSystem: payload
        }))
);
