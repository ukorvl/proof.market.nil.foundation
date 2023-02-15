/**
 * @file Type declaration.
 * @copyright Yury Korotovskikh <u.korotovskiy@nil.foundation>
 */

import type { OrderBookDataItem } from './OrderBookDataItem';

/**
 * Order book data.
 */
export type OrderBookData = {
    asks: OrderBookDataItem[];
    bids: OrderBookDataItem[];
};
