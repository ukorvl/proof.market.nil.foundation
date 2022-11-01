/**
 * @file Type declaration.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

/**
 * Order book table data.
 */
export type OrderBookTableData = {
    ordersAmount: number;
    cost: number;
    eval_time: number;
    type: 'bid' | 'ask';
    volume?: number;
};
