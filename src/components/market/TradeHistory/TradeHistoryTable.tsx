/**
 * @file React component.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

import { ReactElement, useEffect, memo } from 'react';
import { TableState, useSortBy, useTable } from 'react-table';
import { OrderBookTableData, TradeHistoryData, TradeHistoryTableColumn } from 'src/models';
import { notEmpty } from 'src/utils';
import { useDebounce, useInitialTableState } from 'src/hooks';
import { Table, TableHeader } from 'src/components';
``;
/**
 * Props.
 */
type TradeHistoryTableProps = {
    columns: TradeHistoryTableColumn[];
    data: TradeHistoryData[];
};

/**
 * React-table hook list to pass into table instance.
 */
const tableHooks = [useSortBy].filter(notEmpty);

/**
 * Initial table state without user interactions.
 */
const defaultTableState: Partial<TableState<OrderBookTableData>> = {
    sortBy: [
        {
            id: 'timestamp',
            desc: true,
        },
    ],
    hiddenColumns: ['type', 'volume'],
};

/**
 * Order book table.
 *
 * @param {TradeHistoryTableProps} props Props.
 * @returns React component.
 */
export const TradeHistoryTable = memo(function TradeHistoryTable({
    columns,
    data,
}: TradeHistoryTableProps): ReactElement {
    const [initialState, setInitialState] = useInitialTableState(
        'tradeHistoryTable',
        defaultTableState,
    );

    const { getTableBodyProps, visibleColumns, rows, prepareRow, state } = useTable(
        { columns, data, initialState },
        ...tableHooks,
    );

    const debouncedState = useDebounce(state, 500);

    useEffect(() => {
        setInitialState(debouncedState);
    }, [setInitialState, debouncedState]);

    return (
        <Table className="tradeHistoryTable">
            <thead>
                <tr>
                    {visibleColumns.map(column => (
                        <TableHeader
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
                        <tr
                            {...row.getRowProps()}
                            key={row.id}
                        >
                            {row.cells.map(cell => {
                                const { key, ...rest } = cell.getCellProps();

                                return (
                                    <td
                                        key={key}
                                        {...rest}
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
});
