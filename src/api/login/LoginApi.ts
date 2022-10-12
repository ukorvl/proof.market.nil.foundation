/**
 * @file Api.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

import { createBearerHttpClient } from '../common';
import { LoginData, LoginDto } from '../../models';

const httpFetcher = createBearerHttpClient();
const databaseUrl = `_db/${process.env.REACT_APP_DBMS_DEFAULT_DATABASE}`;

/**
 * Login.
 *
 * @param loginData - Login data.
 * @returns .
 */
export const login = (loginData: LoginData): Promise<LoginDto> =>
    httpFetcher.post<LoginDto, LoginData>(`${databaseUrl}/_open/auth`, loginData);

/**
 * Check jtw tocken.
 *
 * @returns .
 */
export const chekJwt = (): Promise<void> => httpFetcher.get(`${databaseUrl}/_api/version`);

/**
 * Renew jtw tocken.
 *
 * @deprecated
 * @returns .
 */
export const renewJwt = (): Promise<LoginDto> =>
    httpFetcher.post<LoginDto>(`${databaseUrl}/_open/auth/renew`);
