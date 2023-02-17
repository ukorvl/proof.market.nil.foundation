/**
 * @file Api.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

import { createApiClient } from '../common';
import type { Proof } from '../../models';

const httpFetcher = createApiClient('/proof');

/**
 * Get current user proofs.
 *
 * @returns Proofs.
 */
export const getProofs = (): Promise<Proof[]> => httpFetcher.get('/owner').json();

/**
 * Get proof by key.
 *
 * @param proofKey Proof key.
 * @returns Proofs.
 */
export const getProofById = (proofKey: Proof['_key']): Promise<Proof> =>
    httpFetcher.get(proofKey).json();
