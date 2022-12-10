/**
 * @file Api.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

import { Circuit, CircuitInfo, CircuitStats } from 'src/models';
import { createBearerHttpClient } from '../common';

const dbName = process.env.REACT_APP_DBMS_DEFAULT_DATABASE;
const databaseUrl = `_db/${dbName}`;
const apiUrl = `${databaseUrl}/_api/`;
const httpFetcher = createBearerHttpClient(apiUrl);

const newFetcher = createBearerHttpClient('');

/**
 * Get circuits.
 *
 * @returns Circuit list.
 */
export const getCircuits = (): Promise<Circuit> =>
    httpFetcher
        .post('cursor', {
            query: 'FOR x IN @@relation LET att = APPEND(SLICE(ATTRIBUTES(x), 0, 25), "_key", true) LIMIT @offset, @count RETURN KEEP(x, att)',
            bindVars: {
                '@relation': 'circuit',
                offset: 0,
                count: 100,
            },
            batchSize: 100,
        })
        .then((x: any) => x.result);

/**
 * Get circuits info.
 *
 * @returns .
 */
export const getCircuitsInfo = (): Promise<CircuitInfo> =>
    newFetcher.get(`/${databaseUrl}/${dbName}/circuit/info`);

/**
 * Get circuits stats.
 *
 * @returns .
 */
export const getCircuitsStats = (): Promise<CircuitStats> =>
    newFetcher.get(`/${databaseUrl}/${dbName}/circuit/statistics`);
