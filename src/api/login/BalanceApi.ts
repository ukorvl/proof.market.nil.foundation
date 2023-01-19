/**
 * @file Api.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

import { createBearerHttpClient } from '../common';

const db = process.env.REACT_APP_DBMS_DEFAULT_DATABASE;
const apiVersion = process.env.REACT_APP_API_VERSION;

const httpFetcher = createBearerHttpClient(`_db/${db}/${apiVersion}/user`);

/**
 * Get user balance.
 *
 * @param user - User to get balance.
 * @returns .
 */
export const getUserBalance = (user: string): Promise<number | undefined> =>
    httpFetcher.get(`/${user}/balance`);
