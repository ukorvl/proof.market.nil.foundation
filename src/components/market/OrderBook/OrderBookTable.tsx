/**
 * @file React component.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

import { ReactElement, useEffect, useMemo, memo } from 'react';
import { Row, TableState, useSortBy, useTable } from 'react-table';
import { LastOrderData, OrderBookTableColumn, OrderBookTableData } from 'src/models';
import { notEmpty } from 'src/utils';
import { useDebounce, useInitialTableState } from 'src/hooks';
import { Table, TableHeader } from 'src/components';
import { OrderBookTableRow } from './OrderBookTableRow';

/**
 * Props.
 */
type OrderBookTableProps = {
    columns: OrderBookTableColumn[];
    data: OrderBookTableData[];
    lastOrderData?: LastOrderData;
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
            id: 'cost',
            desc: true,
        },
    ],
    hiddenColumns: ['type', 'volume'],
};

/**
 * Order book table.
 *
 * @param {OrderBookTableProps} props Props.
 * @returns React component.
 */
export const OrderBookTable = memo(function OrderBookTable({
    columns,
    data,
    lastOrderData,
}: OrderBookTableProps): ReactElement {
    const [initialState, setInitialState] = useInitialTableState(
        'orderBookTable',
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

    const asks = useMemo(() => rows.filter(x => x.values.type === 'ask'), [rows]);
    const bids = useMemo(() => rows.filter(x => x.values.type === 'bid'), [rows]);

    return (
        <Table className="orderBookTable">
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
                {asks.map(row => renderRow(row, prepareRow, 'ask'))}
                {lastOrderData && lastOrderData.cost && (
                    <tr className="lastOrderDataContainer">
                        <td colSpan={3}>
                            <div className={lastOrderData.type}>{`$ ${lastOrderData.cost}`}</div>
                            <div className="text-muted">{lastOrderData.eval_time}</div>
                        </td>
                    </tr>
                )}
                {bids.map(row => renderRow(row, prepareRow, 'bid'))}
            </tbody>
        </Table>
    );
});

/**
 * Render row.
 *
 * @param row Row instance.
 * @param prepareRow Prepare row callback.
 * @param className Class.
 * @returns Row.
 */
const renderRow = (
    row: Row<OrderBookTableData>,
    prepareRow: (r: Row<OrderBookTableData>) => void,
    className: string,
): ReactElement => {
    prepareRow(row);
    return (
        <OrderBookTableRow
            key={row.id}
            row={row}
            className={className}
        />
    );
};
