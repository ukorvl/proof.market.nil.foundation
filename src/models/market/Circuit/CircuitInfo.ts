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
    _key: string;
    /**
     * Current circuit cost.
     */
    current: number | null;
    /**
     * Open price.
     */
    open: number | null;
    /**
     * Close (latest) price.
     */
    close: number | null;
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
    min: number | null;
    /**
     * 24h hight.
     */
    max: number | null;
};
