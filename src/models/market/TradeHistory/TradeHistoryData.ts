/**
 * @file Type declaration.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

import type { TradeOrderChange } from '../TradeOrder';

/**
 * Trade history data.
 */
export type TradeHistoryData = {
    time: string;
    cost: number;
    generation_time?: number;
    type: TradeOrderChange;
};
