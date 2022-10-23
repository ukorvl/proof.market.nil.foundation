/**
 * @file Type declaration.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

import { ColumnAccessor } from './ColumnAccessor';

/**
 * Order book table data.
 */
export type OrderBookTableData = {
    [key in ColumnAccessor]?: string;
};
