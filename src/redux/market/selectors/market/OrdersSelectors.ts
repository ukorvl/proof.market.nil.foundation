/**
 * @file Selectors.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

import { createSelector } from '@reduxjs/toolkit';
import { RootStateType } from '../../../RootStateType';

const selectOrdersList = (s: RootStateType) => s.ordersState.orders;
const selectedid = (s: RootStateType) => s.circuitsState.selectedid;

/**
 * Select all current circuit - related orders.
 */
export const selectOrders = createSelector(selectOrdersList, selectedid, (orders, selectedid) =>
    orders.filter(x => x.circuit_id === selectedid),
);
