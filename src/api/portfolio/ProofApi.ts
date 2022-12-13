/**
 * @file Api.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

import { Proof } from '../../models';
import { createBearerHttpClient } from '../common';

const databaseUrl = `_db/${process.env.REACT_APP_DBMS_DEFAULT_DATABASE}`;
const apiUrl = `${databaseUrl}/_api/`;
const httpFetcher = createBearerHttpClient(apiUrl);

/**
 * Get proofs.
 *
 * @param currentUser Current user.
 * @returns Proofs.
 */
export const getProofs = (currentUser: string): Promise<Proof> =>
    httpFetcher
        .post('cursor', {
            query: `
                FOR x IN @@relation
                    RETURN UNSET(x, 'proof')
            `,
            bindVars: {
                '@relation': 'proof',
            },
        })
        .then((x: any) => x.result);
