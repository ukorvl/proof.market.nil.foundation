/**
 * @file React component.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

import { ReactElement, memo, useCallback } from 'react';
import { Cell, Column, TableInstance, TableState } from 'react-table';
import { ManageOrdersData, TradeOrderType } from 'src/models';
import { ReactTable, TRow, TCell } from 'src/components';

/**
 * Props.
 */
type HistoryOrdersTableProps = {
    data: ManageOrdersData[];
};

/**
 * Table columns.
 */
const columns: Column<ManageOrdersData>[] = [
    {
        Header: 'Time',
        accessor: 'timestamp',
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
        Header: 'Generation time',
        accessor: 'eval_time',
    },
];

/**
 * Initial table state without user interactions.
 */
const defaultTableState: Partial<TableState<ManageOrdersData>> = {
    sortBy: [
        {
            id: 'timestamp',
            desc: true,
        },
    ],
};

/**
 * History orders table.
 *
 * @param {HistoryOrdersTableProps} props Props.
 * @returns React component.
 */
export const HistoryOrdersTable = memo(function ActiveOrdersTable({
    data,
}: HistoryOrdersTableProps): ReactElement {
    const renderRows = useCallback(
        ({ rows, prepareRow }: TableInstance<ManageOrdersData>) =>
            rows.map(row => {
                prepareRow(row);
                return (
                    <TRow
                        {...row.getRowProps()}
                        key={row.id}
                    >
                        {row.cells.map(cell => {
                            const { value, column, getCellProps } = cell;
                            const { key, ...rest } = getCellProps();
                            const shouldUseToFixed =
                                column.id === 'eval_time' || column.id === 'cost';

                            return (
                                <TCell
                                    className={getCellClassName(cell)}
                                    key={key}
                                    {...rest}
                                >
                                    <span>{shouldUseToFixed ? value.toFixed(4) : value}</span>
                                </TCell>
                            );
                        })}
                    </TRow>
                );
            }),
        [],
    );

    return (
        <ReactTable
            name="historyOrdersTable"
            className="historyOrdersTable"
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
