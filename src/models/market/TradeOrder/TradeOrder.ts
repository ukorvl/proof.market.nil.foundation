/**
 * @file Type declaration.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

import type { CreateTradeOrder } from './CreateTradeOrder';
import type { TradeOrderStatus } from './TradeOrderStatus';

/**
 * Trade order.
 */
export interface TradeOrder extends CreateTradeOrder {
    /**
     * Id.
     */
    id: string;
    /**
     * Order status.
     */
    status: TradeOrderStatus;
    /**
     * Id of accepted Order.
     */
    order: string | null;
    /**
     * Time of trade order creation.
     */
    init_time: string;
}
