/**
 * @file Api.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

import { Bid, CreateBid } from 'src/models';
import { createBearerHttpClient } from '../common';

const databaseUrl = `_db/${process.env.REACT_APP_DBMS_DEFAULT_DATABASE}`;
const apiUrl = `${databaseUrl}/_api/`;
const httpFetcher = createBearerHttpClient(apiUrl);

const createFetcher = createBearerHttpClient('/market/bid');

/**
 * Get bids.
 *
 * @returns Bids.
 */
export const getBids = (): Promise<Bid[]> =>
    httpFetcher
        .post('cursor', {
            query: 'FOR x IN @@relation LET att = APPEND(SLICE(ATTRIBUTES(x), 0, 25), "_key", true) LIMIT @offset, @count RETURN KEEP(x, att)',
            bindVars: {
                '@relation': 'bid',
                offset: 0,
                count: 1000,
            },
            batchSize: 1000,
        })
        .then((x: any) => x.result);

/**
 * Create Bid.
 *
 * @param data - Bid dto.
 * @returns Bid.
 */
export const createBid = (data: CreateBid): Promise<Bid> =>
    createFetcher.post('', data).then((x: any) => x);

/**
 * Remove Bid.
 *
 * @param bidToRemoveId Ask to remove id.
 * @returns Ask.
 */
export const removeBid = (bidToRemoveId: Bid['id']): Promise<void> =>
    httpFetcher.post('simple/remove-by-keys', { keys: [bidToRemoveId], relation: 'bid' });
