/**
 * @file Api.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

import { Proof } from '../../models';
import { createBearerHttpClient } from '../common';

const db = process.env.REACT_APP_DBMS_DEFAULT_DATABASE;
const httpFetcher = createBearerHttpClient(`_db/${db}/_api/`);

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
                LET bidsByUser = (
                    FOR doc in bid
                    FILTER doc.status == 'completed'
                    FILTER doc.sender == '${currentUser}'
                    RETURN doc
                )

                FOR x IN @@relation
                    LET contained = (
                        FOR doc in bidsByUser
                        FILTER x.bid_key == doc._key
                        RETURN doc
                    )
                    FILTER LENGTH(contained) > 0
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
export const getProofById = (proofId: string): Promise<Proof> =>
    httpFetcher
        .post('cursor', {
            query: `
                FOR x IN @@relation
                    FILTER x.id == '${proofId}'
                    RETURN x
            `,
            bindVars: {
                '@relation': 'proof',
            },
        })
        .then((x: any) => x.result);
