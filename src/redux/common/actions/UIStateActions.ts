/**
 * @file Redux action creators.
 * @copyright Yury Korotovskikh <u.korotovskiy@nil.foundation>
 */

import { createAction } from '@reduxjs/toolkit';

/**
 * Dispatch to trigger effects when page is visible.
 */
export const SetPageIsVisible = createAction<boolean>('@ui_state/SET_PAGE_IS_VISIBLE');
