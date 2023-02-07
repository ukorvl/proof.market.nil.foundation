/**
 * @file Api.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

import type { Bid, CreateBid } from 'src/models';
import type { GetOrdersParameters } from '../common';
import { createBearerHttpClient, getApiUrlByParameters } from '../common';

const httpFetcher = createBearerHttpClient('/bid');

/**
 * Get bids by parameters.
 *
 * @param {GetOrdersParameters} parameters Parameters.
 * @param limit Response limit.
 * @param startFrom Start from.
 * @returns Bids.
 */
export const getBids = (
    parameters: GetOrdersParameters,
    limit?: number,
    startFrom?: number,
): Promise<Bid[]> => httpFetcher.get(getApiUrlByParameters(parameters, limit, startFrom));

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
 * @param bidToRemoveKey Bid to remove key.
 * @returns Ask.
 */
export const removeBid = (bidToRemoveKey: Bid['_key']): Promise<void> =>
    httpFetcher.delete(`/${bidToRemoveKey}`);
