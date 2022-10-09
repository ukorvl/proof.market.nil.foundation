/**
 * @file Redux action creators.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

import { createAction } from '@reduxjs/toolkit';
import { Circuit } from '../../../models';

/**
 * Update circuits list.
 */
export const UpdateCircuitsList = createAction<Circuit[]>('@circuits/UPDATE_CIRCUITS_LIST');

/**
 * Update selected circuit id.
 */
export const UpdateSelectedid = createAction<string>('@circuits/UPDATE_SELECTED_CIRCUIT_ID');

/**
 * Update circuits loading state.
 */
export const UpdateIsLoadingCircuits = createAction<boolean>('@circuits/UPDATE_IS_LOADING');

/**
 * Update circuits error state.
 */
export const UpdateCircuitsError = createAction<Error>('@circuits/UPDATE_ERROR');
