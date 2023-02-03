/**
 * @file Api.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

import { createBearerHttpClient } from '../common';
import type { Proof } from '../../models';

const httpFetcher = createBearerHttpClient('/proof');

/**
 * Get current user proofs.
 *
 * @returns Proofs.
 */
export const getProofs = (): Promise<Proof[]> => httpFetcher.get('/owner');

/**
 * Get proof by key.
 *
 * @param proofKey Proof key.
 * @returns Proofs.
 */
export const getProofById = (proofKey: Proof['_key']): Promise<Proof> =>
    httpFetcher.get(`/${proofKey}`);
