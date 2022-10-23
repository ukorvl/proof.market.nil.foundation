/**
 * @file React component.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

import { ReactElement } from 'react';
import { Table } from '@nilfoundation/react-components';
import { useSortBy, useTable } from 'react-table';
import { OrderBookTableColumn, OrderBookTableData } from 'src/models';
import { OrderBookTableHeader } from './OrderBookTableHeader';
import { OrderBookTableRow } from './OrderBookTableRow';

/**
 * Props.
 */
type OrderBookTableProps = {
    columns: OrderBookTableColumn[];
    data: OrderBookTableData[];
};

/**
 * Order book table.
 *
 * @param {OrderBookTableProps} props Props.
 * @returns React component.
 */
export const OrderBookTable = ({ columns, data }: OrderBookTableProps): ReactElement => {
    const { getTableProps, getTableBodyProps, headers, rows, prepareRow } = useTable(
        { columns, data },
        useSortBy,
    );

    if (data.length === 0) {
        return <h5>No orders.</h5>;
    }

    return (
        <Table
            className="orderBookTable"
            condensed
            responsive
            {...getTableProps()}
        >
            <thead>
                <tr>
                    {headers.map(column => (
                        <OrderBookTableHeader
                            key={column.id}
                            column={column}
                        />
                    ))}
                </tr>
            </thead>
            <tbody {...getTableBodyProps()}>
                {rows.map(row => {
                    prepareRow(row);
                    return (
                        <OrderBookTableRow
                            key={row.id}
                            row={row}
                        />
                    );
                })}
            </tbody>
        </Table>
    );
};
