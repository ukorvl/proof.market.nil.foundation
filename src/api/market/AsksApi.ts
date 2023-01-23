/**
 * @file Api.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

import { Ask, CreateAsk, TradeHistoryData } from '../../models';
import { createBearerHttpClient } from '../common';

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

/**
 * Get last n alount of completed asks.
 *
 * @param length Amount orders to get.
 * @param start Start position.
 * @param circuitId - Selected circuit id to get asks from.
 * @returns Bids.
 */
export const getCompletedAsksByLimit = (
    length: number,
    start: number,
    circuitId: number,
): Promise<{
    hasNextPage: boolean;
    items: TradeHistoryData[];
}> =>
    httpFetcher
        .post('cursor', {
            query: `
                let orders = (
                    for doc in ask
                        FILTER doc.circuit_id == ${circuitId}
                        FILTER doc.status == 'completed'
                        SORT doc.matched_time desc
                        WINDOW { preceding: 1 }
                        AGGREGATE d = UNIQUE(KEEP(doc, "_key", "cost"))
                        LET pricediff = doc.cost - d[0].cost
                        LET type = pricediff >= 0 ? 'grow' : 'loss'
                        LIMIT ${start}, ${length}
                        RETURN {
                            time: doc.matched_time,
                            cost: doc.cost,
                            eval_time: doc.eval_time,
                            type: type
                        }
                )

                return orders
            `,
        })
        .then(({ result }: any) => ({ items: result.at(0) }));

//(pricediff == 0 ? null : 'loss')
