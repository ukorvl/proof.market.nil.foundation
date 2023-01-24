/**
 * @file Api.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

import { Circuit, CircuitInfo, CircuitStats, LastProofProducer } from 'src/models';
import { createBearerHttpClient } from '../common';

const db = process.env.REACT_APP_DBMS_DEFAULT_DATABASE;
const apiVersion = process.env.REACT_APP_API_VERSION;

const apiUrl = `_db/${db}/${apiVersion}/statement`;
const httpFetcher = createBearerHttpClient(apiUrl);

//TODO - remove after api is ready
const tempFetcher = createBearerHttpClient(`_db/${db}/_api/`);

/**
 * Get circuits.
 *
 * @returns Circuit list.
 */
export const getCircuits = (): Promise<Circuit> => httpFetcher.get('');

/**
 * Get circuits info.
 *
 * @returns .
 */
export const getCircuitsInfo = (): Promise<CircuitInfo> => httpFetcher.get(`/?info`);

/**
 * Get circuits stats.
 *
 * @returns .
 */
export const getCircuitsStats = (): Promise<CircuitStats> => httpFetcher.get(`/?statistics`);
