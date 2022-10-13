/**
 * @file Reducer.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

import { createReducer } from '@reduxjs/toolkit';
import { Proposal } from 'src/models';
import { UpdateProposalsList, AddProposal } from '../actions';

/**
 * State.
 */
export type ProposalsReducerState = {
    proposals: Proposal[];
};

/**
 * Initial state.
 */
const initialState: ProposalsReducerState = {
    proposals: [],
};

/**
 * Reducer of proposals.
 */
export const ProposalsReducer = createReducer(initialState, builder =>
    builder
        .addCase(UpdateProposalsList, (state, { payload }) => ({
            ...state,
            proposals: payload,
        }))
        .addCase(AddProposal, (state, { payload }) => ({
            ...state,
            proposals: { ...state.proposals, payload },
        })),
);
