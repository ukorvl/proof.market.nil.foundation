import { Database } from '@nilfoundation/dbmsjs';
import useSWR from 'swr';
import { memoize } from 'lodash';

type ApiMethod = 'get' | 'put' | 'post' | 'delete';

const url = process.env.REACT_APP_DBMS_HOST;
const port = process.env.REACT_APP_DBMS_PORT;
const database = process.env.REACT_APP_DBMS_DATABASE;

if ([url, port, database].some(x => x === undefined)) {
    throw new Error('Environment variables are not set.');
}

export const getDB = memoize(
    (db: string) =>
        new Database({
            url,
            databaseName: db,
        }),
);

export const getRouteForDB = memoize(
    (db: string, route: string) => getDB(db).route(route),
    (db: string, route: string) => `${db}/${route}`,
);

export const getApiRouteForCurrentDB = () => getRouteForDB(database!, '_api');

export const useAPIFetch = (path: string | null, method: ApiMethod = 'get', body?: any) =>
    useSWR(path, () => {
        const route = getApiRouteForCurrentDB();

        return route[method](path as string, body);
    });
