/**
 * @file Selectors.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

import { createSelector } from '@reduxjs/toolkit';
import type { Proof } from 'src/models';
import type { RootStateType } from 'src/redux';

/**
 * Select all proofs from state.
 *
 * @param s State.
 * @returns All proofs.
 */
export const selectProofList = (s: RootStateType): Proof[] => s.proofState.proofs;

/**
 * Select selected proof key.
 *
 * @param s State.
 * @returns Selected proof key.
 */
export const selectSelectedProofKey = (s: RootStateType): string | undefined =>
    s.proofState.selectedProofKey;

/**
 * Select current selected proof.
 */
export const selectSelectedProof = createSelector(
    selectProofList,
    selectSelectedProofKey,
    (proofs, key) => proofs.find(p => p._key === key),
);
