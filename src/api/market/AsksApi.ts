/**
 * @file Api.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

import { Ask, CreateAsk } from '../../models';
import { createBearerHttpClient } from '../common';

const db = process.env.REACT_APP_DBMS_DEFAULT_DATABASE;
const apiVersion = process.env.REACT_APP_API_VERSION;

const httpFetcher = createBearerHttpClient(`_db/${db}/_api/`);
const newFetcher = createBearerHttpClient(`_db/${db}/${apiVersion}/ask`);

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
                FILTER x.statement_key == '${circuitId}'
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
export const createAsk = (data: CreateAsk): Promise<Ask> => newFetcher.post('', data);

/**
 * Remove Ask.
 *
 * @param askToRemoveId Ask to remove id.
 * @returns Ask.
 */
export const removeAsk = (askToRemoveId: Ask['_key']): Promise<void> =>
    newFetcher.delete(`/${askToRemoveId}`);
