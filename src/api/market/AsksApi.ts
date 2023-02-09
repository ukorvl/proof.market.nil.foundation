/**
 * @file Api.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

import { createApiClient, getApiUrlByParameters } from '../common';
import type { GetOrdersParameters } from '../common';
import type { Ask } from '../../models';

const httpFetcher = createApiClient('/ask');

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
): Promise<Ask[]> => httpFetcher.get(getApiUrlByParameters(parameters, limit, startFrom)).json();

/**
 * Remove Ask.
 *
 * @param askToRemoveId Ask to remove id.
 * @returns Ask.
 */
export const removeAsk = (askToRemoveId: Ask['_key']): Promise<void> =>
    httpFetcher.delete(askToRemoveId).json();
