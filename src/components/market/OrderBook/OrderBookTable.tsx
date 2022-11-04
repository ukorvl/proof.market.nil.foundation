/**
 * @file React component.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

import { ReactElement, memo, useCallback } from 'react';
import { Row, TableState } from 'react-table';
import { LastOrderData, OrderBookTableColumn, OrderBookTableData } from 'src/models';
import { ReactTable } from 'src/components';
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
 * Initial table state without user interactions.
 */
const defaultOrderBookState: Partial<TableState<OrderBookTableData>> = {
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
    const renderRows = useCallback(
        (rows: Row<OrderBookTableData>[], prepareRow: (row: Row<OrderBookTableData>) => void) => {
            const asks = rows.filter(x => x.values.type === 'ask');
            const bids = rows.filter(x => x.values.type === 'bid');

            return (
                <>
                    {asks.map(row => renderRow(row, prepareRow, 'ask'))}
                    {lastOrderData && lastOrderData.cost && (
                        <tr className="lastOrderDataContainer">
                            <td colSpan={3}>
                                <div
                                    className={lastOrderData.type}
                                >{`$ ${lastOrderData.cost}`}</div>
                                <div className="text-muted">{lastOrderData.eval_time}</div>
                            </td>
                        </tr>
                    )}
                    {bids.map(row => renderRow(row, prepareRow, 'bid'))}
                </>
            );
        },
        [lastOrderData],
    );

    return (
        <ReactTable
            name="orderBookTable"
            className="orderBookTable"
            renderRows={renderRows}
            data={data}
            columns={columns}
            initialState={defaultOrderBookState}
        />
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
