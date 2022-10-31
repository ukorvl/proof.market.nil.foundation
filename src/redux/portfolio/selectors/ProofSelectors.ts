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
 * Select all proof without heavy 'proof' field.
 */
export const selectPartialProofList = createSelector(selectProofList, proofs =>
    proofs.map(x => {
        const { id, bid_id } = x;
        return { id, bid_id };
    }),
);
