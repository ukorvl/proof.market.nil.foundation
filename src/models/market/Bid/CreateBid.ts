/**
 * @file Type declaration.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

import { TradeOrder } from '../TradeOrder';

/**
 * Bid dto.
 */
export interface CreateBid extends TradeOrder {
    /**
     * Public input.
     */
    public_input: Record<string, string>;
}
