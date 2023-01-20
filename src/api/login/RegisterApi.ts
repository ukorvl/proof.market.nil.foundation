/**
 * @file Api.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

import { createBearerHttpClient } from '../common';
import { RegisterData } from '../../models';

const db = process.env.REACT_APP_DBMS_DEFAULT_DATABASE;
const apiVersion = process.env.REACT_APP_API_VERSION;

const newFetcher = createBearerHttpClient(`_db/${db}/${apiVersion}`, false, false);
const httpFetcher = createBearerHttpClient(`_db/${db}/_api/`);

/**
 * Register user.
 *
 * @param registerData - Register data.
 * @returns .
 */
export const signUp = (registerData: RegisterData): Promise<RegisterData> =>
    newFetcher.post('/user/signup', registerData);

/**
 * Check if username is unique.
 *
 * @param userNameToCheck Username to check uniqueness.
 * @returns True if username is unique.
 */
export const checkIsUsernameUnique = (userNameToCheck: string): Promise<boolean> =>
    httpFetcher
        .post('cursor', {
            query: `
            for doc in user
            filter doc.user.user == '${userNameToCheck}'
            return doc
        `,
        })
        .then((x: any) => x.result.length === 0);
