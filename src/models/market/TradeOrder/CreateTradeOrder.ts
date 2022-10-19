/**
 * @file Type declaration.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

/**
 * Create trade order data.
 */
export interface CreateTradeOrder {
    /**
     * Id of related circuit.
     */
    circuit_id: string;
    /**
     * Cost, USD.
     */
    cost: number;
    /**
     * Eval time.
     */
    eval_time: number;
    /**
     * Wait period.
     */
    wait_period: number;
    /**
     * User, that created an order.
     */
    sender: string;
}
