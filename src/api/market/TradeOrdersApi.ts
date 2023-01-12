/**
 * @file Api.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

import { Bid } from 'src/models';
import { createBearerHttpClient } from '../common';

const apiUrl = `_db/${process.env.REACT_APP_DBMS_DEFAULT_DATABASE}/_api/`;
const httpFetcher = createBearerHttpClient(apiUrl);

/**
 * Get last n alount of completed orders.
 *
 * @param limit Amount orders to get.
 * @returns Bids.
 */
export const getCompletedTradeOrdersByLimit = (limit: number): Promise<Bid[]> =>
    httpFetcher
        .post('cursor', {
            query: `
                let asks = (
                    for doc in ask
                    filter doc.status == 'completed'
                    sort doc.updatedOn desc
                    limit ${limit}
                    return doc
                )

                let bids = (
                    for doc in bid
                    filter doc.status == 'completed'
                    sort doc.updatedOn desc
                    limit ${limit}
                    return doc
                )

                let orders = append(asks, bids)
                for doc in orders
                sort doc.updatedOn desc
                limit ${limit}
                return doc
            `,
        })
        .then((x: any) => x.result);
