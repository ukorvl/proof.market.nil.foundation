/**
 * @file React component.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

import { ReactElement, memo, useCallback } from 'react';
import { Cell, Column, Row, TableState } from 'react-table';
import { ManageOrdersData, TradeOrderType } from 'src/models';
import { ReactTable } from 'src/components';

/**
 * Props.
 */
type ActiveOrdersTableProps = {
    data: ManageOrdersData[];
};

/**
 * Table columns.
 */
const columns: Column<ManageOrdersData>[] = [
    {
        Header: 'Created',
        accessor: 'init_time',
    },
    {
        Header: 'Type',
        accessor: 'type',
    },
    {
        Header: 'Cost',
        accessor: 'cost',
    },
    {
        Header: 'Eval_time',
        accessor: 'eval_time',
    },
    {
        accessor: 'orderId',
        disableSortBy: true,
    },
];

/**
 * Initial table state without user interactions.
 */
const defaultTableState: Partial<TableState<ManageOrdersData>> = {
    sortBy: [
        {
            id: 'init_time',
            desc: true,
        },
    ],
};

/**
 * Active orders table.
 *
 * @param {ActiveOrdersTableProps} props Props.
 * @returns React component.
 */
export const ActiveOrdersTable = memo(function ActiveOrdersTable({
    data,
}: ActiveOrdersTableProps): ReactElement {
    const renderRows = useCallback(
        (rows: Row<ManageOrdersData>[], prepareRow: (row: Row<ManageOrdersData>) => void) =>
            rows.map(row => {
                prepareRow(row);
                return (
                    <tr
                        {...row.getRowProps()}
                        key={row.id}
                    >
                        {row.cells.map(cell => {
                            const { key, ...rest } = cell.getCellProps();

                            return (
                                <td
                                    className={getCellClassName(cell)}
                                    key={key}
                                    {...rest}
                                >
                                    {cell.render('Cell')}
                                </td>
                            );
                        })}
                    </tr>
                );
            }),
        [],
    );

    return (
        <ReactTable
            name="activeOrdersTable"
            data={data}
            columns={columns}
            renderRows={renderRows}
            initialState={defaultTableState}
        />
    );
});

/**
 * Generate className to table cell.
 *
 * @param cell Cell.
 * @returns Class name.
 */
const getCellClassName = (cell: Cell<ManageOrdersData>) => {
    if (cell.column.id !== 'type') {
        return undefined;
    }

    return `${cell.value === TradeOrderType.buy ? 'grow' : 'loss'}TextColor`;
};
