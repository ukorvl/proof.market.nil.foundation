/**
 * @file Api.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

import { Ask, CreateAsk } from '../../models';
import { createBearerHttpClient } from '../common';

const databaseUrl = `_db/${process.env.REACT_APP_DBMS_DEFAULT_DATABASE}`;
const apiUrl = `${databaseUrl}/_api/`;
const httpFetcher = createBearerHttpClient(apiUrl);

/**
 * Get asks.
 *
 * @returns Asks.
 */
export const getAsks = (): Promise<Ask[]> =>
    httpFetcher
        .post('cursor', {
            query: 'FOR x IN @@relation LET att = APPEND(SLICE(ATTRIBUTES(x), 0, 25), "_key", true) LIMIT @offset, @count RETURN KEEP(x, att)',
            bindVars: {
                '@relation': 'ask',
                offset: 0,
                count: 1000,
            },
            batchSize: 1000,
        })
        .then((x: any) => x.result);

/**
 * Create Ask.
 *
 * @param data Ask dto.
 * @returns Ask.
 */
export const createAsk = (data: CreateAsk): Promise<Ask> =>
    httpFetcher.post('document?relation=proposal', data).then((x: any) => x);
