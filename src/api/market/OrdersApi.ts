/**
 * @file Api.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

import { Order, OrderDto } from '../../models';
import { createBearerHttpClient } from '../common';

const databaseUrl = `_db/${process.env.REACT_APP_DBMS_DEFAULT_DATABASE}`;
const apiUrl = `${databaseUrl}/_api/`;
const httpFetcher = createBearerHttpClient(apiUrl);

/**
 * Create Order.
 *
 * @returns .
 */
export const createOrder = (data: OrderDto): Promise<Order> =>
    httpFetcher.post('document?relation=order', data).then((x: any) => x);
