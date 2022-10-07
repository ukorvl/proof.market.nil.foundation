/**
 * @file Redux action creators.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

import { createAction } from '@reduxjs/toolkit';
import { ProofSystem } from '../../../enums';

/**
 * Update selected proof system.
 */
export const UpdateProofSystem = createAction<ProofSystem>('@proofSystem/UPDATE');
