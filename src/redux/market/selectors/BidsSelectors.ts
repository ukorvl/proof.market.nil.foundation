/**
 * @file Selectors.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

import { createSelector } from '@reduxjs/toolkit';
import type { Bid } from 'src/models';
import type { RootStateType } from 'src/redux';
import { selectUserName } from '../../login';

/**
 * Select all bids.
 *
 * @param s State.
 * @returns All bids.
 */
export const selectBidsList = (s: RootStateType): Bid[] => s.bidsState.bids;

/**
 * Select bids, created by current user.
 */
export const selectCurrentUserBids = createSelector(selectBidsList, selectUserName, (bids, user) =>
    bids.filter(x => x.sender === user),
);

/**
 * Select bids, created by current user with 'created' status.
 */
export const selectCurrentUserCreatedBids = createSelector(selectCurrentUserBids, asks =>
    asks.filter(x => x.status === 'created'),
);

/**
 * Select bids, created by current user with 'compelted' status.
 */
export const selectCurrentUserCompletedBids = createSelector(selectCurrentUserBids, asks =>
    asks.filter(x => x.status === 'completed'),
);
