/**
 * @file Redux action creators.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

import { createAction } from '@reduxjs/toolkit';
import { Order } from 'src/models';

/**
 * Update circuits list.
 */
export const UpdateOrdersList = createAction<Order[]>('@orders/UPDATE_ORDERS_LIST');

/**
 * Add order.
 */
export const AddOrder = createAction<Order>('@orders/ADD_ORDER');

/**
 * Update selected circuit id.
 */
export const UpdateSelectedOrderId = createAction<string>('@orders/UPDATE_SELECTED_ORDER_ID');
