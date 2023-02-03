/**
 * @file Type declaration.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

import type { CreateTradeOrder } from '../TradeOrder';

/**
 * Bid dto.
 */
export interface CreateBid extends CreateTradeOrder {
    /**
     * Public input.
     */
    input: Record<string, string>;
}
