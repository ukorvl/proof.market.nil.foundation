/**
 * @file Type declaration.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

import { TradeOrderChange } from '../TradeOrder';

/**
 * Trade history data.
 */
export type TradeHistoryData = {
    timestamp: string;
    cost: number;
    eval_time: number;
    type: TradeOrderChange;
};
