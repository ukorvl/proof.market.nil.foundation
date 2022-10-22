/**
 * @file React component.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

import { ReactElement } from 'react';
import { Icon, Table, uniqueId } from '@nilfoundation/react-components';
import { useSortBy, useTable } from 'react-table';
import { OrderBookTableColumn, OrderBookTableData } from '../../../hooks';

type OrderBookTableProps = {
    columns: OrderBookTableColumn[];
    data: OrderBookTableData[];
    maxRows?: number;
};

/**
 * Order book table.
 *
 * @param {OrderBookTableProps} props Props.
 * @returns React component.
 */
export const OrderBookTable = ({
    columns,
    data,
    maxRows = 20,
}: OrderBookTableProps): ReactElement => {
    const { getTableProps, getTableBodyProps, headers, rows, prepareRow } = useTable(
        { columns, data },
        useSortBy,
    );

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
                            {column && (
                                <Icon iconName={`fa-solid fa-angle-${column ? 'down' : 'up'}`} />
                            )}
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
                                        key={cell.value ?? uniqueId('sss')}
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
