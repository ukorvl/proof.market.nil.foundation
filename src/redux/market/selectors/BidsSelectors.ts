/**
 * @file Selectors.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

import { createSelector } from '@reduxjs/toolkit';
import { Bid } from 'src/models';
import { RootStateType } from 'src/redux';
import { selectCurrentCircuitId } from './CircuitsSelectors';
import { selectCurrentUser } from '../../login';

/**
 * Select all bids.
 *
 * @param s State.
 * @returns All bids.
 */
export const selectBidsList = (s: RootStateType): Bid[] => s.bidsState.bids;

/**
 * Select all current circuit - related bids from all users.
 */
export const selectCurrentCircuitBids = createSelector(
    selectBidsList,
    selectCurrentCircuitId,
    (bids, selectedid) => bids.filter(x => x.circuit_id === selectedid),
);

/**
 * Select bids, created by current user.
 */
export const selectCurrentUserBids = createSelector(
    selectBidsList,
    selectCurrentUser,
    (bids, user) => bids.filter(x => x.sender === user),
);

/**
 * Select bids, created by current user in current circuit.
 */
export const selectCurrentCircuitCurrentUserBids = createSelector(
    selectCurrentCircuitBids,
    selectCurrentUser,
    (bids, user) => bids.filter(x => x.sender === user),
);

/**
 * Select bids, created by current user in current circuit with 'created' status.
 */
export const selectCurrentCircuitCurrentUserCreatedBids = createSelector(
    selectCurrentCircuitCurrentUserBids,
    asks => asks.filter(x => x.status === 'created'),
);

/**
 * Select bids, created by current user in current circuit with 'compelted' status.
 */
export const selectCurrentCircuitCurrentUserCompletedBids = createSelector(
    selectCurrentCircuitCurrentUserBids,
    asks => asks.filter(x => x.status === 'completed'),
);
