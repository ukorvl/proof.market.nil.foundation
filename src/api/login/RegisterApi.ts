/**
 * @file Api.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

import { createBearerHttpClient } from '../common';
import type { RegisterData } from '../../models';

const apiUrl = '_db/market/v0_0';
const httpFetcher = createBearerHttpClient(apiUrl);

/**
 * Register user.
 *
 * @param registerData - Register data.
 * @returns .
 */
export const signUp = (registerData: RegisterData): Promise<RegisterData> =>
    httpFetcher.post('/user/signup', registerData);
