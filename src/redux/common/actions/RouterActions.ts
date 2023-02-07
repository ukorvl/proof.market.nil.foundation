/**
 * @file Redux action creators.
 * @copyright Yury Korotovskikh <u.korotovskiy@nil.foundation>
 */

import { createAction } from '@reduxjs/toolkit';
import type { Location, Params } from 'react-router-dom';

/**
 * Set location {@link Location}.
 */
export const SetLocation = createAction<Location>('@router/SET_LOCATION');

/**
 * Set Params {@link Params}.
 */
export const SetParams = createAction<Readonly<Params<string>>>('@router/SET_PARAMS');
