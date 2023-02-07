/**
 * @file Api.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

import { createBearerHttpClient, getApiUrlByParameters } from '../common';
import type { GetOrdersParameters } from '../common';
import type { Ask } from '../../models';

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
 * Remove Ask.
 *
 * @param askToRemoveId Ask to remove id.
 * @returns Ask.
 */
export const removeAsk = (askToRemoveId: Ask['_key']): Promise<void> =>
    httpFetcher.delete(`/${askToRemoveId}`);
