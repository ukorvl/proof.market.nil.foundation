/**
 * @file React component.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

import { ReactElement, memo, useCallback, useState } from 'react';
import { Cell, Column, Row, TableInstance, TableState } from 'react-table';
import { useDispatch } from 'react-redux';
import { ManageOrdersData, TradeOrderType } from 'src/models';
import { ReactTable, TRow, TCell, ClicableIcon, Details } from 'src/components';
import { removeAsk, removeBid } from 'src/api';
import { RemoveAsk, RemoveBid } from 'src/redux';
import { renderDashOnEmptyValue } from 'src/utils';
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
        Header: 'Time',
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
    {
        accessor: 'status',
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
    hiddenColumns: ['status'],
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

    const renderRow = useCallback(
        (
            row: Row<ManageOrdersData>,
            prepareRow: (r: Row<ManageOrdersData>) => void,
            canRemove = false,
        ) => {
            prepareRow(row);

            return (
                <TRow
                    {...row.getRowProps()}
                    key={row.id}
                >
                    {row.cells.map(cell => {
                        const { value, column, getCellProps } = cell;
                        const { key, ...rest } = getCellProps();
                        const shouldUseToFixed = column.id === 'eval_time' || column.id === 'cost';

                        if (column.id === 'orderId') {
                            return canRemove ? (
                                <TCell
                                    key={key}
                                    {...rest}
                                >
                                    <ClicableIcon
                                        iconName="fa-solid fa-ban"
                                        disabled={processing}
                                        onClick={() => setSelectedRow(cell.row)}
                                    />
                                </TCell>
                            ) : (
                                <></>
                            );
                        }

                        return (
                            <TCell
                                className={getCellClassName(cell)}
                                key={key}
                                {...rest}
                            >
                                <span>
                                    {shouldUseToFixed ? renderDashOnEmptyValue(value) : value}
                                </span>
                            </TCell>
                        );
                    })}
                </TRow>
            );
        },
        [processing, setSelectedRow],
    );

    const renderRows = useCallback(
        ({ rows, prepareRow }: TableInstance<ManageOrdersData>) => {
            const activeOrders = rows.filter(x => x.values.status === 'created');
            const inProgressOrders = rows.filter(x => x.values.status === 'processing');

            return (
                <>
                    {activeOrders.length !== 0 && (
                        <Details
                            bottomIndent={false}
                            title={<TRow className="titleRow">CREATED</TRow>}
                        >
                            {activeOrders.map(x => renderRow(x, prepareRow, true))}
                        </Details>
                    )}
                    {inProgressOrders.length !== 0 && (
                        <Details
                            bottomIndent={false}
                            title={<TRow className="titleRow">IN PROGRESS</TRow>}
                        >
                            {inProgressOrders.map(x => renderRow(x, prepareRow))}
                        </Details>
                    )}
                </>
            );
        },
        [renderRow],
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
