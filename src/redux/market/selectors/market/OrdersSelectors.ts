/**
 * @file Selectors.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

import { createSelector } from '@reduxjs/toolkit';
import { RootStateType } from '../../../RootStateType';

const selectOrdersList = (s: RootStateType) => s.ordersState.orders;
const selectedCircuitid = (s: RootStateType) => s.circuitsState.selectedid;
const selectedOrderid = (s: RootStateType) => s.ordersState.selectedOrderId;

/**
 * Select all current circuit - related orders.
 */
export const selectOrders = createSelector(
    selectOrdersList,
    selectedCircuitid,
    (orders, selectedid) => orders.filter(x => x.circuit_id === selectedid),
);

/**
 * Selected circuit selector.
 */
export const selectCurrentOrder = createSelector(
    selectOrders,
    selectedOrderid,
    (orders, selectedOrderid) => orders.find(x => x.id === selectedOrderid),
);
