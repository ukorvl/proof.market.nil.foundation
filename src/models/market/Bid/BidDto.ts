/**
 * @file Type declaration.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

import { Proof } from '../../portfolio';
import { TradeOrder } from '../TradeOrder';

/**
 * Bid.
 */
export interface BidDto extends TradeOrder {
    /**
     * Public input.
     */
    public_input: Record<string, string>;
    /**
     * Proof (when generated, either - null).
     */
    proof: Proof['id'] | null;
    /**
     * Time, when bid was accepted, either - null.
     */
    timestamp: string | null;
}
