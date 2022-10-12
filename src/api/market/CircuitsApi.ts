/**
 * @file Api.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

import { Circuit } from '../../models';
import { getApiRouteForCurrentDB } from '../../dbms';
import { createBearerHttpClient } from '../common';

const databaseUrl = `_db/${process.env.REACT_APP_DBMS_DEFAULT_DATABASE}`;
const apiUrl = `${databaseUrl}/_api/`;
const httpFetcher = createBearerHttpClient(apiUrl);

/**
 * Get circuits.
 *
 * @returns .
 */
export const getCircuits = (): Promise<Circuit[]> =>
    getApiRouteForCurrentDB()
        .get('relation')
        .then(r => r.body.result);

export const getCircui = (): Promise<Circuit[]> =>
    httpFetcher.get('relation').then((x: any) => x.result);

export const cursor = (): Promise<void> =>
    httpFetcher
        .post('cursor', {
            query: 'FOR x IN @@relation LET att = APPEND(SLICE(ATTRIBUTES(x), 0, 25), "_key", true) LIMIT @offset, @count RETURN KEEP(x, att)',
            bindVars: {
                '@relation': 'circuit',
                offset: 0,
                count: 10,
            },
            batchSize: 10,
        })
        .then((x: any) => x.result);

export const getOrders = () =>
    httpFetcher
        .post('cursor', {
            query: 'FOR x IN @@relation LET att = APPEND(SLICE(ATTRIBUTES(x), 0, 25), "_key", true) LIMIT @offset, @count RETURN KEEP(x, att)',
            bindVars: {
                '@relation': 'order',
                offset: 0,
                count: 10,
            },
            batchSize: 10,
        })
        .then((x: any) => x.result);

export const getProposals = () =>
    httpFetcher
        .post('cursor', {
            query: 'FOR x IN @@relation LET att = APPEND(SLICE(ATTRIBUTES(x), 0, 25), "_key", true) LIMIT @offset, @count RETURN KEEP(x, att)',
            bindVars: {
                '@relation': 'proposal',
                offset: 0,
                count: 10,
            },
            batchSize: 10,
        })
        .then((x: any) => x.result);
