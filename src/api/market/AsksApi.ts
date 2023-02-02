/**
 * @file Api.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

import { createBearerHttpClient } from '../common';
import type { Ask, CreateAsk } from '../../models';

const databaseUrl = `_db/${process.env.REACT_APP_DBMS_DEFAULT_DATABASE}`;
const apiUrl = `${databaseUrl}/_api/`;
const httpFetcher = createBearerHttpClient(apiUrl);

const createFetcher = createBearerHttpClient('/market/ask');

/**
 * Get asks.
 *
 * @param circuitId Circuit id.
 * @returns Asks.
 */
export const getAsksByCircuitId = (circuitId: string): Promise<Ask[]> =>
    httpFetcher
        .post('cursor', {
            query: `
                FOR x IN @@relation
                FILTER x.circuit_id == ${circuitId}
                RETURN x`,
            bindVars: {
                '@relation': 'ask',
            },
            batchSize: 10000,
        })
        .then((x: any) => x.result);

/**
 * Create Ask.
 *
 * @param data Ask dto.
 * @returns Ask.
 */
export const createAsk = (data: CreateAsk): Promise<Ask> => createFetcher.post('', data);

/**
 * Remove Ask.
 *
 * @param askToRemoveId Ask to remove id.
 * @returns Ask.
 */
export const removeAsk = (askToRemoveId: Ask['id']): Promise<void> =>
    httpFetcher.post('cursor', {
        query: `
            FOR x IN @@relation
                FILTER x.id == ${askToRemoveId}
                REMOVE { _key: x._key } IN @@relation
            `,
        bindVars: {
            '@relation': 'ask',
        },
    });
