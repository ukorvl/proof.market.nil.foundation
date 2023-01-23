/**
 * @file Redux action creators.
 * @copyright Yury Korotovskikh <u.korotovskiy@nil.foundation>
 */

import { createAction } from '@reduxjs/toolkit';

/**
 * Dispatch to trigger effects when page is visible.
 */
export const PageIsVisible = createAction('@ui_state/PAGE_IS_VISIBLE');

/**
 * Dispatch to trigger effects when page is hidden.
 */
export const PageIsHidden = createAction('@ui_state/PAGE_IS_HIDDEN');
