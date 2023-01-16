/**
 * @file Api.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

import { TradeHistoryData } from 'src/models';
import { createBearerHttpClient } from '../common';

const apiUrl = `_db/${process.env.REACT_APP_DBMS_DEFAULT_DATABASE}/_api/`;
const httpFetcher = createBearerHttpClient(apiUrl);

/**
 * Get last n alount of completed orders.
 *
 * @param length Amount orders to get.
 * @param start Start position.
 * @returns Bids.
 */
export const getCompletedTradeOrdersByLimit = (
    length: number,
    start: number,
): Promise<TradeHistoryData[]> =>
    httpFetcher
        .post('cursor', {
            query: `
                let asks = (
                    for doc in ask
                    filter doc.status == 'completed'
                    sort doc.matched_time desc
                    limit ${start}, ${length}
                    return doc
                )

                let bids = (
                    for doc in bid
                    filter doc.status == 'completed'
                    sort doc.matched_time desc
                    limit ${start}, ${length}
                    return doc
                )

                let orders = append(asks, bids)

                for doc in orders
                sort doc.matched_time desc
                limit ${start}, ${length}
                return {
                    time: doc.matched_time,
                    cost: doc.cost,
                    eval_time: doc.eval_time,
                }
            `,
        })
        .then((x: any) => x.result);
