/**
 * @file Api.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

import { createBearerHttpClient } from '../common';
import { RegisterData } from '../../models';

const apiUrl = `_db/${process.env.REACT_APP_DBMS_DEFAULT_DATABASE}`;
const httpFetcher = createBearerHttpClient(apiUrl);

/**
 * Register user.
 *
 * @param registerData - Register data.
 * @returns .
 */
export const signUp = (registerData: RegisterData): Promise<RegisterData> =>
    httpFetcher.post('/signup', registerData);
