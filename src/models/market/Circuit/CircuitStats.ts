/**
 * @file Type declaration.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

/**
 * Circuit statistics.
 */
export type CircuitStats = {
    /**
     * Circuit key.
     */
    _key: string;
    /**
     * Average proof cost.
     */
    avg_cost: number | null;
    /**
     * Average proof generation time.
     */
    avg_eval_time: number | null;
    /**
     * Count of completed tasks.
     */
    completed: number | null;
};
