import {Database} from '@nilfoundation/dbmsjs';
import useSWR from 'swr';
import {memoize} from 'lodash';

type ApiMethod = 'get' | 'put' | 'post' | 'delete';

declare var frontendConfig: { [key: string]: any };
declare var dbmsHelper: { [key: string]: any };

const url = process.env.REACT_APP_DBMS_HOST || window.location.origin;

export const getDB = memoize((db: string) => new Database({
    url,
    databaseName: db,
    auth: {
        token: dbmsHelper.getCurrentJwt()
    }
}));

export const getRouteForDB = memoize((db: string, route: string) => getDB(db).route(route),
    (db: string, route: string) => `${db}/${route}`);

export const getApiRouteForCurrentDB = () => getRouteForDB(frontendConfig.db, '_api');

export const useAPIFetch = (path: string | null, method: ApiMethod = 'get', body?: any) => useSWR(path, () => {
    const route = getApiRouteForCurrentDB();

    return route[method](path as string, body);
});
