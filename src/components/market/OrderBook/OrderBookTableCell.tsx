/**
 * @file React component.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

import { ReactElement } from 'react';
import { Cell } from 'react-table';
import { OrderBookTableData } from 'src/models';

/**
 * Props.
 */
type OrderBookTableCellProps = {
    cell: Cell<OrderBookTableData>;
};

/**
 * Order book table cell.
 *
 * @param {OrderBookTableCellProps} props Props.
 * @returns React component.
 */
export const OrderBookTableCell = ({ cell }: OrderBookTableCellProps): ReactElement => {
    return <td {...cell.getCellProps()}>{cell.value}</td>;
};
