/**
 * @file Api helpers.
 * @copyright Yury Korotovskikh <u.korotovskiy@nil.foundation>
 */

import type { TradeOrder } from 'src/models';

const db = process.env.REACT_APP_DBMS_DEFAULT_DATABASE;
const apiVersion = process.env.REACT_APP_API_VERSION;

/**
 * Get orders parameters.
 */
export type GetOrdersParameters = {
    statement_key?: string;
    limit?: number;
} & Partial<TradeOrder>;

/**
 * Api base url.
 */
export const apiBaseUrl = `_db/${db}/${apiVersion}`;

/**
 * @param parameters Parameters.
 * @param limit Limit.
 * @returns New url to get orders by parameters.
 */
export const getApiUrlByParameters = (parameters: GetOrdersParameters, limit?: number): string =>
    `?${limit !== undefined ? `limit=${limit}&` : ''}q=[{${Object.entries(parameters)
        .map(([x, y]) => `"key": "${x}", "value": "${y}"`)
        .join('')}}]`;
