/**
 * @file Type declaration.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

import { ColumnAccessor } from './ColumnAccessor';

/**
 * Column.
 */
export type OrderBookTableColumn = {
    Header: string;
    accessor: ColumnAccessor;
    disableSortBy?: boolean;
};
