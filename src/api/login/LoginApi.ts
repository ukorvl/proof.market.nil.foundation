/**
 * @file Api.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

import { createBearerHttpClient } from '../common';
import { LoginData, LoginDto } from '../../models';

const httpFetcher = createBearerHttpClient();

/**
 * Login.
 *
 * @param loginData - Login data.
 * @returns .
 */
export const login = (loginData: LoginData): Promise<LoginDto> =>
    httpFetcher.post<LoginDto, LoginData>(
        `_db/${process.env.REACT_APP_DBMS_DEFAULT_DATABASE}/_open/auth`,
        loginData,
    );
