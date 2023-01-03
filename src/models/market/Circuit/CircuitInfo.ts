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
    circuit_id: number;
    /**
     * Current circuit cost.
     */
    current: number;
    /**
     * Open price.
     */
    open: number;
    /**
     * Close (latest) price.
     */
    close: number;
    /**
     * Daily change of circuit cost. Can be positive or negative.
     */
    daily_change: number;
    /**
     * 24h volume.
     */
    volume: number;
    /**
     * 24h low.
     */
    min: number;
    /**
     * 24h hight.
     */
    max: number;
};
