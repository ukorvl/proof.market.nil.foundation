/**
 * @file Api.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

import { Circuit, CircuitInfo, CircuitStats } from 'src/models';
import { createBearerHttpClient } from '../common';

const dbName = process.env.REACT_APP_DBMS_DEFAULT_DATABASE;

const apiUrl = `_db/${dbName}/${dbName}/statement`;
const httpFetcher = createBearerHttpClient(apiUrl);

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
    httpFetcher
        .post('cursor', {
            query: `
                FOR s IN circuit
                LET temp = first(for doc in ask
                    filter doc.status == 'completed'
                    filter doc.circuit_id == s.id
                    sort doc.timestamp desc
                    return {circuit_id: s.id, sender: doc.sender})
                RETURN temp
            `,
        })
        .then((x: any) => x.result);
