/**
 * @file Redux action creators.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

import { createAction } from '@reduxjs/toolkit';
import { Proposal } from 'src/models';

/**
 * Update proposals list.
 */
export const UpdateProposalsList = createAction<Proposal[]>('@proposals/UPDATE_PROPOSALS_LIST');
