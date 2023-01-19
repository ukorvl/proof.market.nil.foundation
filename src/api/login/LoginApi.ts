/**
 * @file Api.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

import { createBearerHttpClient } from '../common';
import { LoginData, AuthData } from '../../models';

const db = process.env.REACT_APP_DBMS_DEFAULT_DATABASE;
const httpFetcher = createBearerHttpClient(`_db/${db}/_open/auth`);

/**
 * Login.
 *
 * @param loginData - Login data.
 * @returns .
 */
export const login = (loginData: LoginData): Promise<AuthData> =>
    httpFetcher.post<AuthData, LoginData>('', loginData);

/**
 * Renew jtw tocken.
 *
 * @param username Username.
 * @returns .
 */
export const renewJwt = (username: string): Promise<AuthData | Record<string, never>> =>
    httpFetcher.post('/renew', { username });
