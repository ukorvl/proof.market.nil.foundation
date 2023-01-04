/**
 * @file Selectors.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

import { createSelector } from '@reduxjs/toolkit';
import { Proof } from 'src/models';
import { RootStateType } from 'src/redux';

/**
 * Select all proofs from state.
 *
 * @param s State.
 * @returns All proofs.
 */
export const selectProofList = (s: RootStateType): Proof[] => s.proofState.proofs;

/**
 * Select selected proof id.
 *
 * @param s State.
 * @returns Selected proof id.
 */
export const selectSelectedProofId = (s: RootStateType): string | undefined =>
    s.proofState.selectedProofId;

/**
 * Select current selected proof.
 */
export const selectSelectedProof = createSelector(
    selectProofList,
    selectSelectedProofId,
    (proofs, id) => proofs.find(p => p._key === id),
);
