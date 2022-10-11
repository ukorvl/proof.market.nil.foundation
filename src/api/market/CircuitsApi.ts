/**
 * @file Api.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

import { Circuit } from '../../models';
import { getApiRouteForCurrentDB } from '../../dbms';

/**
 * Get circuits.
 *
 * @returns .
 */
export const getCircuits = (): Promise<Circuit[]> =>
    getApiRouteForCurrentDB()
        .get('relation')
        .then(r => r.body.result);
