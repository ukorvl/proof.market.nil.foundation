/**
 * @file Selectors.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

import { createSelector } from '@reduxjs/toolkit';
import { Ask } from 'src/models';
import { RootStateType } from 'src/redux';
import { selectCurrentCircuitId } from './CircuitsSelectors';

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
