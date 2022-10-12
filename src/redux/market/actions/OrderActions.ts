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
