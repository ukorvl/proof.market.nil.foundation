/**
 * @file Selectors.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

import { createSelector } from '@reduxjs/toolkit';
import type { RootStateType } from '../../RootStateType';

const selectCircuitsList = (s: RootStateType) => s.circuitsState.circuits;

/**
 * Selects current circuit id.
 *
 * @param s State.
 * @returns Current selected circuit id.
 */
export const selectCurrentCircuitId = (s: RootStateType): number | undefined =>
    s.circuitsState.selectedid;

/**
 * Sorted and filtered circuits selector.
 */
export const selectCircuits = createSelector(selectCircuitsList, circuits => circuits);

/**
 * Selected circuit selector.
 */
export const selectCurrentCircuit = createSelector(
    selectCircuits,
    selectCurrentCircuitId,
    (circuits, selectedid) => circuits.find(x => x.id === selectedid),
);
