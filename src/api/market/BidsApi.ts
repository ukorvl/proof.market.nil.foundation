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
 * @param circuitId Circuit id.
 * @returns Bids.
 */
export const getBidsByCircuitId = (circuitId: string): Promise<Bid[]> =>
    httpFetcher
        .post('cursor', {
            query: `
                FOR x IN @@relation
                    FILTER x.statement_key == '${circuitId}'
                    RETURN x`,
            bindVars: {
                '@relation': 'bid',
            },
            batchSize: 10000,
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
 * @param bidToRemoveId Bid to remove id.
 * @returns Ask.
 */
export const removeBid = (bidToRemoveId: Bid['_key']): Promise<void> =>
    httpFetcher
        .post('cursor', {
            query: `
            FOR x IN @@relation
                FILTER x._key == '${bidToRemoveId}'
                REMOVE { _key: x._key } IN @@relation
            `,
            bindVars: {
                '@relation': 'bid',
            },
        })
        .then((x: any) => x.result);
