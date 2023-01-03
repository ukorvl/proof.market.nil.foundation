/**
 * @file Utility function.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

import { Ask, Bid } from 'src/models';

/**
 *
 * @param first First order.
 * @param second Second order.
 * @returns Comparsion result.
 */
export const sortTradeOrdersByDate = <T extends Bid | Ask>(first: T, second: T): number =>
    Date.parse(first.createdOn) - Date.parse(second.createdOn);
