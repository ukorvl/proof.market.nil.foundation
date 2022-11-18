/**
 * @file React component.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

import { ReactElement, memo, useCallback, useState } from 'react';
import { Cell, Column, Row, TableInstance, TableState } from 'react-table';
import { useDispatch } from 'react-redux';
import { ManageOrdersData, TradeOrderType } from 'src/models';
import { ReactTable, TRow, TCell } from 'src/components';
import { removeAsk, removeBid } from 'src/api';
import { RemoveAsk, RemoveBid } from 'src/redux';
import { RemoveOrderCell } from './RemoveOrderCell';
import { ToolbarPanel } from './ToolbarPanel';

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
        Header: 'Gen time',
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
    const [selectedRow, setSelectedRow] = useState<Row<ManageOrdersData> | null>(null);
    const [processing, setProcessing] = useState(false);
    const dispatch = useDispatch();

    const onAcceptRemoveOrder = useCallback(async () => {
        setProcessing(true);

        if (!selectedRow) {
            return;
        }

        try {
            const { orderId, type } = selectedRow.values;
            const fetcher = type === TradeOrderType.buy ? removeBid : removeAsk;
            const action = type === TradeOrderType.buy ? RemoveBid : RemoveAsk;

            await fetcher(orderId);
            dispatch(action(orderId));
            setSelectedRow(null);
        } catch (e) {
            // TODO Handle error
        } finally {
            setProcessing(false);
        }
    }, [setProcessing, selectedRow, setSelectedRow, dispatch]);

    const onDecline = useCallback(() => {
        setSelectedRow(null);
    }, [setSelectedRow]);

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

                            if (column.id === 'orderId') {
                                return (
                                    <RemoveOrderCell
                                        key={key}
                                        cell={cell}
                                        disabled={processing}
                                        setSelectedRow={setSelectedRow}
                                    />
                                );
                            }

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
        [processing],
    );

    return (
        <>
            <ReactTable
                name="activeOrdersTable"
                className="activeOrdersTable"
                data={data}
                columns={columns}
                renderRows={renderRows}
                initialState={defaultTableState}
            />
            {selectedRow !== null && (
                <ToolbarPanel
                    onAccept={onAcceptRemoveOrder}
                    onDecline={onDecline}
                    processing={processing}
                    message="Proceed removing order?"
                />
            )}
        </>
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
