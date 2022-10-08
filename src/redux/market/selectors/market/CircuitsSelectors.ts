/**
 * @file Selectors.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

import { createSelector } from '@reduxjs/toolkit';
import { RootStateType } from '../../../RootStateType';

const selectCircuitsList = (s: RootStateType) => s.circuitsState.circuits;
const selectedid = (s: RootStateType) => s.circuitsState.selectedid;

/**
 * Sorted and filtered circuits selector.
 */
export const selectCircuits = createSelector(
    selectCircuitsList,
    circuits => circuits
);

/**
 * Selected circuit selector.
 */
export const selectCurrentCircuit = createSelector(
    selectCircuits,
    selectedid,
    (circuits, selectedid) => circuits.find(x => x.id === selectedid)
);
