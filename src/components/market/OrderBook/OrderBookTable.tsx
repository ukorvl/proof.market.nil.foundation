/**
 * @file React component.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

import { ReactElement } from 'react';
import { Table } from '@nilfoundation/react-components';
import { useTable } from 'react-table';
import { OrderBookTableColumn, OrderBookTableData } from '../../../hooks';

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
export const OrderBookTable = (props: OrderBookTableProps): ReactElement => {
    const { getTableProps, getTableBodyProps, headers, rows, prepareRow } = useTable({ ...props });

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
                        <th
                            {...column.getHeaderProps()}
                            key={column.id}
                            className={`thead-${column.id}`}
                        >
                            {column.render('Header')}
                        </th>
                    ))}
                </tr>
            </thead>
            <tbody {...getTableBodyProps()}>
                {rows.map(row => {
                    prepareRow(row);
                    return (
                        <tr
                            {...row.getRowProps()}
                            key={row.id}
                            id={row.id}
                        >
                            {row.cells.map(cell => {
                                return (
                                    <td
                                        {...cell.getCellProps()}
                                        key={cell.value ?? 'd'}
                                    >
                                        {cell.render('Cell')}
                                    </td>
                                );
                            })}
                        </tr>
                    );
                })}
            </tbody>
        </Table>
    );
};
