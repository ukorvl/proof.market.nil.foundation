/**
 * @file Redux action creators.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

import { createAction } from '@reduxjs/toolkit';
import { Ask } from 'src/models';

/**
 * Update asks list.
 */
export const UpdateAsksList = createAction<Ask[]>('@proposals/UPDATE_ASKS_LIST');

/**
 * Add ask.
 */
export const AddAsk = createAction<Ask>('@proposals/ADD_ASK');
