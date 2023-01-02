/**
 * @file Type declaration.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

/**
 * Circuits list table data.
 */
export type CircuitsListData = {
    id: number;
    name: string;
    cost?: number | null;
    change?: number | null;
};
