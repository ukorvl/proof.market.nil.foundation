/**
 * @file Redux action creators.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

import { createAction } from '@reduxjs/toolkit';

/**
 * Update current user name.
 */
export const UpdateUserName = createAction<string | null>('@user/UPDATE_USER_NAME');

/**
 * Update current user balance.
 */
export const UpdateUserBalance = createAction<number | undefined>('@user/UPDATE_USER_BALANCE');
