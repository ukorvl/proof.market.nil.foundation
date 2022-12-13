/**
 * @file Redux action creators.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

import { createAction } from '@reduxjs/toolkit';

/**
 * Update current user.
 */
export const UpdateUser = createAction<string | null>('@user/UPDATE');
