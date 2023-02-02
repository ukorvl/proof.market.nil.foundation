/**
 * @file Api.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

import type { Bid, CreateBid, TradeOrder } from 'src/models';
import { createBearerHttpClient } from '../common';

/**
 * Get order parameters.
 */
export type GetOrdersParameters = {
    statement_key?: string;
    limit?: number;
    status?: TradeOrder['status'];
};

const httpFetcher = createBearerHttpClient('/bid');

/**
 * Get bids by parameters.
 *
 * @param {GetOrdersParameters} parameters Parameters.
 * @param limit Response limit.
 * @returns Bids.
 */
export const getBids = (parameters: GetOrdersParameters, limit?: number): Promise<Bid[]> =>
    httpFetcher.get(
        `?${limit !== undefined ? `limit=${limit}&` : ''}q=[{${Object.entries(parameters)
            .map(([x, y]) => `"key": "${x}", "value": "${y}"`)
            .join('')}}]`,
    );

/**
 * Create Bid.
 *
 * @param data - Bid dto.
 * @returns Bid.
 */
export const createBid = (data: CreateBid): Promise<Bid> => httpFetcher.post('', data);

/**
 * Remove Bid.
 *
 * @param bidToRemoveId Bid to remove id.
 * @returns Ask.
 */
export const removeBid = (bidToRemoveId: Bid['_key']): Promise<void> =>
    httpFetcher.delete(`/${bidToRemoveId}`);
