/**
 * @file Type declaration.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

/**
 * Trade order.
 */
export interface TradeOrder {
    circuit_id: string;
    cost: number;
    eval_time: number;
    wait_period: number;
    sender: string;
}
