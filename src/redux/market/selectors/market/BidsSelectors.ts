/**
 * @file Selectors.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

import { createSelector } from '@reduxjs/toolkit';
import { RootStateType } from '../../../RootStateType';

const selectBidsList = (s: RootStateType) => s.bidsState.bids;
const selectedCircuitid = (s: RootStateType) => s.circuitsState.selectedid;

/**
 * Select all current circuit - related bids from all users.
 */
export const selectBids = createSelector(selectBidsList, selectedCircuitid, (bids, selectedid) =>
    bids.filter(x => x.circuit_id === selectedid),
);
