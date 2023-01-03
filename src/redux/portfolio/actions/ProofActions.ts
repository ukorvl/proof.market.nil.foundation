/**
 * @file Redux action creators.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

import { createAction } from '@reduxjs/toolkit';
import { Proof } from 'src/models';

/**
 * Update proof list.
 */
export const UpdateProofList = createAction<Proof[]>('@proof/UPDATE_PROOF_LIST');

/**
 * Update proofs loading state.
 */
export const UpdateIsLoadingProofs = createAction<boolean>('@proof/UPDATE_IS_LOADING');

/**
 * Update proof error state.
 */
export const UpdateProofsError = createAction<boolean>('@proof/UPDATE_ERROR');

/**
 * Update selected circuit id.
 */
export const UpdateSelectedProofId = createAction<number>('@proof/UPDATE_SELECTED_PROOF_ID');
