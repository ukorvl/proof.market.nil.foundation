/**
 * @file Api.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

import { Circuit, CircuitInfo, CircuitStats } from 'src/models';
import { createBearerHttpClient } from '../common';

const dbName = process.env.REACT_APP_DBMS_DEFAULT_DATABASE;

const apiUrl = `_db/${dbName}/${dbName}`;
const httpFetcher = createBearerHttpClient(apiUrl, false);

/**
 * Get circuits.
 *
 * @returns Circuit list.
 */
export const getCircuits = (): Promise<Circuit> => httpFetcher.get('/statement');

/**
 * Get circuits info.
 *
 * @returns .
 */
export const getCircuitsInfo = (): Promise<CircuitInfo> => httpFetcher.get(`/statement/info`);

/**
 * Get circuits stats.
 *
 * @returns .
 */
export const getCircuitsStats = (): Promise<CircuitStats> =>
    httpFetcher.get(`/statement/statistics`);
