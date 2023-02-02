/**
 * @file Bearer http client.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

import type { AxiosRequestConfig } from 'axios';
import { HttpClient } from './HttpClient';
import { getItemFromLocalStorage } from '../../packages/LocalStorage';

const { REACT_APP_BASE_API_URL } = process.env;

/**
 * Creates HTTP client with authorization.
 *
 * @param baseUrl - Base api url.
 * @param withCredentials - Include credentials.
 * @returns Bearer http client.
 */
export const createBearerHttpClient = (baseUrl?: string, withCredentials?: boolean): HttpClient =>
    new HttpClient(
        {
            baseURL: baseUrl ? `${REACT_APP_BASE_API_URL}/${baseUrl}` : `${REACT_APP_BASE_API_URL}`,
            withCredentials,
        },
        client => client.interceptors.request.use(injectJwtToken),
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
