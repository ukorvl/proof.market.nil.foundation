/**
 * @file Selectors.
 * @copyright Yury Korotovskikh <u.korotovskiy@nil.foundation>
 */

import { createSelector } from '@reduxjs/toolkit';
import sum from 'lodash/sum';
import type { OrderBookPriceStep } from 'src/enums';
import type { OrderBookData } from 'src/models';
import type { RootStateType } from 'src/redux';

/**
 * Select orderBook data.
 *
 * @param s State.
 * @returns Orderbook data.
 */
export const selectOrderBookData = (s: RootStateType): OrderBookData => s.orderBookState.data;

/**
 * Select orderBook price step.
 *
 * @param s State.
 * @returns Orderbook price step.
 */
export const selectOrderBookPriceStep = (s: RootStateType): keyof typeof OrderBookPriceStep =>
    s.orderBookState.priceStep;

/**
 * Returns orderBook max volume.
 */
export const selectOrderBookMaxVolume = createSelector(selectOrderBookData, ({ asks, bids }) =>
    Math.max(sum(asks.map(x => x.ordersAmount)) ?? 0, sum(bids.map(x => x.ordersAmount)) ?? 0),
);
