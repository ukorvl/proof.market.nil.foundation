/**
 * @file Selectors.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

import { createSelector } from '@reduxjs/toolkit';
import { RootStateType } from '../../../RootStateType';

const selectAsksList = (s: RootStateType) => s.asksState.asks;
const selectedCircuitid = (s: RootStateType) => s.circuitsState.selectedid;

/**
 * Select all current circuit - related proposals.
 */
export const selectAsks = createSelector(selectAsksList, selectedCircuitid, (asks, selectedid) =>
    asks.filter(x => x.circuit_id === selectedid),
);
