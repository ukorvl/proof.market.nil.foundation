/**
 * @file Redux action creators.
 * @copyright Yury Korotovskikh <u.korotovskiy@nil.foundation>
 */

import { createAction } from '@reduxjs/toolkit';

/**
 * Dispatch to start listening to server data updates.
 */
export const StartDataRevalidation = createAction('@data_revalidation/START');

/**
 * Dispatch to stop listening to server data updates.
 */
export const StopDataRevalidation = createAction('@data_revalidation/STOP');
