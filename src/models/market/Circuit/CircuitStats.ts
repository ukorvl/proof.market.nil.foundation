/**
 * @file Type declaration.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

/**
 * Circuit statistics.
 */
export type CircuitStats = {
    /**
     * Circuit id.
     */
    circuit_id: number;
    /**
     * Average proof cost.
     */
    avg_cost: number;
    /**
     * Average proof generation time.
     */
    avg_eval_time: number;
    /**
     * Count of completed tasks.
     */
    completed: number;
};
