/**
 * @file Api.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

import { createBearerHttpClient } from '../common';
import type { Proof } from '../../models';

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

/**
 * Get proof by its id.
 *
 * @param proofId Proof id.
 * @returns Proofs.
 */
export const getProofById = (proofId: number): Promise<Proof> =>
    httpFetcher
        .post('cursor', {
            query: `
                FOR x IN @@relation
                    FILTER x.id == ${proofId}
                    RETURN x
            `,
            bindVars: {
                '@relation': 'proof',
            },
        })
        .then((x: any) => x.result);
