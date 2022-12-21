/**
 * @file Bearer http client.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

import { AxiosRequestConfig } from 'axios';
import { HttpClient } from './HttpClient';
import { getItemFromLocalStorage } from '../../packages/LocalStorage';

const { REACT_APP_BASE_API_URL } = process.env;

/**
 * Creates HTTP client with authorization.
 *
 * @param baseUrl - Base api url.
 * @param withCredentials - Include credentials.
 * @param injectToken - Should inject token.
 * @returns Bearer http client.
 */
export const createBearerHttpClient = (
    baseUrl?: string,
    withCredentials?: boolean,
    injectToken = true,
): HttpClient =>
    new HttpClient(
        {
            baseURL: baseUrl ? `${REACT_APP_BASE_API_URL}/${baseUrl}` : `${REACT_APP_BASE_API_URL}`,
            withCredentials,
        },
        injectToken ? client => client.interceptors.request.use(injectJwtToken) : undefined,
    );

const getJwtToken = (): string | undefined => {
    const tokenStorageKey = 'jwt';
    return getItemFromLocalStorage<string>(tokenStorageKey);
};

const injectJwtToken = (config: AxiosRequestConfig): AxiosRequestConfig => {
    const jwtToken = getJwtToken();
    if (jwtToken && config.headers) {
        config.headers.Authorization = `Bearer ${jwtToken}`;
    }
    return config;
};
