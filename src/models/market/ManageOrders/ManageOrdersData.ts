/**
 * @file Type declaration.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

import { TradeOrderStatus, TradeOrderType } from '../TradeOrder';

/**
 * Manage orders data.
 */
export type ManageOrdersData = {
    init_time: string;
    timestamp: string | null;
    cost: number;
    eval_time?: number;
    type: TradeOrderType;
    orderId: string;
    status: TradeOrderStatus;
};
