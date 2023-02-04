/**
 * @file Type declaration.
 * @copyright Yury Korotovskikh <u.korotovskiy@nil.foundation>
 */

import type { TradeOrder } from '../TradeOrder';

/**
 * Ask.
 */
export interface Ask extends TradeOrder {
    /**
     * Time, when bid was accepted, either - null.
     */
    updatedOn: string | null;
}
