/**
 * @file Type declaration.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

/**
 * Circuit information.
 */
export type CircuitInfo = {
    /**
     * Circuit id.
     */
    circuit_id: string;
    /**
     * Current circuit cost.
     */
    current_cost: number;
    /**
     * Daily change of circuit cost. Can be positive or negative.
     */
    daily_change: number;
};
