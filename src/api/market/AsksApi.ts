/**
 * @file Api.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

import { createBearerHttpClient, getApiUrlByParameters } from '../common';
import type { GetOrdersParameters } from '../common';
import type { Ask, CreateAsk } from '../../models';

const httpFetcher = createBearerHttpClient('/ask');

/**
 * Get asks by parameters.
 *
 * @param {GetOrdersParameters} parameters Parameters.
 * @param limit Response limit.
 * @param startFrom Start from.
 * @returns Asks.
 */
export const getAsks = (
    parameters: GetOrdersParameters,
    limit?: number,
    startFrom?: number,
): Promise<Ask[]> => httpFetcher.get(getApiUrlByParameters(parameters, limit, startFrom));

/**
 * Create Ask.
 *
 * @param data Ask dto.
 * @returns Ask.
 */
export const createAsk = (data: CreateAsk): Promise<Ask> => httpFetcher.post('', data);

/**
 * Remove Ask.
 *
 * @param askToRemoveId Ask to remove id.
 * @returns Ask.
 */
export const removeAsk = (askToRemoveId: Ask['_key']): Promise<void> =>
    httpFetcher.delete(`/${askToRemoveId}`);
