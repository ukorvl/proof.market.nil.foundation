/**
 * @file Type declaration.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

/**
 * Order book table data.
 */
export type OrderBookTableData = {
    bid?: string;
    ask?: string;
    cost: number;
    eval_time: number;
    percent?: number;
};
