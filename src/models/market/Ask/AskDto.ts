/**
 * @file Type declaration.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

import type { TradeOrder } from '../TradeOrder';

/**
 * Proposal dto.
 */
export interface AskDto extends TradeOrder {
    /**
     * Time, when bid was accepted, either - null.
     */
    timestamp: string | null;
}
