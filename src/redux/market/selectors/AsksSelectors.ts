/**
 * @file Selectors.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

import { createSelector } from '@reduxjs/toolkit';
import { Ask } from 'src/models';
import { RootStateType } from 'src/redux';
import { selectCurrentCircuitId } from './CircuitsSelectors';
import { selectCurrentUser } from '../../login';

/**
 * Select all asks from state.
 *
 * @param s State.
 * @returns All asks.
 */
export const selectAsksList = (s: RootStateType): Ask[] => s.asksState.asks;

/**
 * Select all current circuit - related proposals.
 */
export const selectCurrentCircuitAsks = createSelector(
    selectAsksList,
    selectCurrentCircuitId,
    (asks, selectedid) => asks.filter(x => x.circuit_id === selectedid),
);

/**
 * Select all completed asks.
 */
export const selectCurrentCircuitCompletedAsks = createSelector(selectCurrentCircuitAsks, asks =>
    asks.filter(x => x.status === 'completed'),
);

/**
 * Select asks, created by current user.
 */
export const selectCurrentUserAsks = createSelector(
    selectAsksList,
    selectCurrentUser,
    (asks, user) => asks.filter(x => x.sender === user),
);

/**
 * Select asks, created by current user in current circuit.
 */
export const selectCurrentCircuitCurrentUserAsks = createSelector(
    selectCurrentCircuitAsks,
    selectCurrentUser,
    (asks, user) => asks.filter(x => x.sender === user),
);

/**
 * Select asks, created by current user in current circuit with 'created' status.
 */
export const selectCurrentCircuitCurrentUserCreatedAsks = createSelector(
    selectCurrentCircuitCurrentUserAsks,
    asks => asks.filter(x => x.status === 'created'),
);

/**
 * Select asks, created by current user in current circuit with 'compelted' status.
 */
export const selectCurrentCircuitCurrentUserCompletedAsks = createSelector(
    selectCurrentCircuitCurrentUserAsks,
    asks => asks.filter(x => x.status === 'completed'),
);
