/**
 * @file Api.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

import { Circuit, CircuitInfo, CircuitStats } from 'src/models';
import { createBearerHttpClient } from '../common';

const dbName = process.env.REACT_APP_DBMS_DEFAULT_DATABASE;

const apiUrl = `_db/${dbName}/${dbName}/statement`;
const httpFetcher = createBearerHttpClient(apiUrl);

//TODO - remove after api is ready
const tempFetcher = createBearerHttpClient(`_db/${dbName}/_api/`);

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

/**
 *
 * @returns .
 */
export const getLastProofProducerData = (): Promise<
    Array<{ circuit_id: string; sender: string }> | undefined
> =>
    tempFetcher
        .post('cursor', {
            query: `
                for s in statement
                let temp = first(for doc in ask
                filter doc.status == 'completed'
                filter doc.statement_key == s._key
                sort doc.updatedOn desc
                return {statement_key: s._key, sender: doc.sender})
                return temp
            `,
        })
        .then((x: any) => x.result);
