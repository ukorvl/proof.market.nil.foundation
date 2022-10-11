/**
 * @file Dbms client.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

import { Database } from '@nilfoundation/dbmsjs';
import { Route } from '@nilfoundation/dbmsjs/build/route';
import { memoize } from 'lodash';
import { getItemFromLocalStorage } from '../packages/LocalStorage';

const token = getItemFromLocalStorage<string>('jwt') || '';

const { REACT_APP_BASE_API_URL, REACT_APP_DBMS_DEFAULT_DATABASE } = process.env;

if (!REACT_APP_BASE_API_URL || !REACT_APP_DBMS_DEFAULT_DATABASE) {
    throw new Error('Env variables are not set.');
}

export const getDB = memoize(
    (db: string) =>
        new Database({
            url: REACT_APP_BASE_API_URL,
            databaseName: db,
            auth: { token },
        }),
);

export const getRouteForDB = memoize(
    (db: string, route: string) => getDB(db).route(route),
    (db: string, route: string) => `${db}/${route}`,
);

/**
 *
 * @returns Route for current db.
 */
export const getApiRouteForCurrentDB = (): Route =>
    getRouteForDB(REACT_APP_DBMS_DEFAULT_DATABASE, '_api');
