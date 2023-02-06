/**
 * @file Redux action creators.
 * @copyright Yury Korotovskikh <u.korotovskiy@nil.foundation>
 */

import { createAction } from '@reduxjs/toolkit';
import type { Location, NavigateFunction, Params } from 'react-router-dom';

/**
 * Set location {@link Location}.
 */
export const SetLocation = createAction<Location>('@router/SET_LOCATION');

/**
 * Set Params {@link Params}.
 */
export const SetParams = createAction<Readonly<Params<string>>>('@router/SET_PARAMS');

/**
 * Set Navigate function {@link NavigateFunction}.
 */
export const SetNavigateFunction = createAction<NavigateFunction>('@router/SET_NAVIGATE_FUNCTION');
