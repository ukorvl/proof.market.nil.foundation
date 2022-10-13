/**
 * @file Selectors.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

import { createSelector } from '@reduxjs/toolkit';
import { RootStateType } from '../../../RootStateType';
import { selectOrders } from './OrdersSelectors';

const selectProposalsList = (s: RootStateType) => s.proposalsState.proposals;

/**
 * Select all current circuit - related proposals.
 */
export const selectProposals = createSelector(
    selectProposalsList,
    selectOrders,
    (proposals, orders) => {
        const ordersIds = orders.map(x => x.id);

        return proposals.filter(x => ordersIds.includes(x.order));
    },
);
