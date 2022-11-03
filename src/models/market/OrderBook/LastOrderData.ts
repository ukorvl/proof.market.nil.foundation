/**
 * @file Type declaration.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

import { TradeOrderChange } from '../TradeOrder';

/**
 * Last order data.
 */
export type LastOrderData = {
    /**
     * Last accepted cost.
     */
    cost?: number;
    /**
     * Last accepted eval_time.
     */
    eval_time?: number;
    /**
     * Shows price changing direction. Neutral if no changes happend.
     */
    type: TradeOrderChange;
};
