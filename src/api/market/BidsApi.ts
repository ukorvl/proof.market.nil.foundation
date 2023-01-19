/**
 * @file Api.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

import { Bid, CreateBid } from 'src/models';
import { createBearerHttpClient } from '../common';

const db = process.env.REACT_APP_DBMS_DEFAULT_DATABASE;
const apiVersion = process.env.REACT_APP_API_VERSION;

const httpFetcher = createBearerHttpClient(`_db/${db}/_api/`);
const newFetcher = createBearerHttpClient(`_db/${db}/${apiVersion}/bid`);

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
export const createBid = (data: CreateBid): Promise<Bid> => newFetcher.post('', data);

/**
 * Remove Bid.
 *
 * @param bidToRemoveId Bid to remove id.
 * @returns Ask.
 */
export const removeBid = (bidToRemoveId: Bid['_key']): Promise<void> =>
    newFetcher.delete(`/${bidToRemoveId}`);
