/**
 * @file Api.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

import { Circuit } from 'src/models';
import { createBearerHttpClient } from '../common';

const databaseUrl = `_db/${process.env.REACT_APP_DBMS_DEFAULT_DATABASE}`;
const apiUrl = `${databaseUrl}/_api/`;
const httpFetcher = createBearerHttpClient(apiUrl);

/**
 * Get circuits.
 *
 * @returns Circuit list.
 */
export const getCircuits = (): Promise<Circuit> =>
    httpFetcher
        .post('cursor', {
            query: 'FOR x IN @@relation LET att = APPEND(SLICE(ATTRIBUTES(x), 0, 25), "_key", true) LIMIT @offset, @count RETURN KEEP(x, att)',
            bindVars: {
                '@relation': 'circuit',
                offset: 0,
                count: 100,
            },
            batchSize: 100,
        })
        .then((x: any) => x.result);
