/**
 * @file Api.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

import { createBearerHttpClient } from '../common';
import { Circuit } from '../../models';

const httpFetcher = createBearerHttpClient();

/**
 * Login.
 *
 * @returns .
 */
export const getCircuits = () =>
    httpFetcher.get<Circuit[]>(`_db/${process.env.REACT_APP_DBMS_DEFAULT_DATABASE}/_open/auth`);
