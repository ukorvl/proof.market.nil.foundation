/**
 * @file React component.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

import { ReactElement, memo, useCallback } from 'react';
import { Row, TableInstance, TableState } from 'react-table';
import { LastOrderData, OrderBookTableColumn, OrderBookTableData } from 'src/models';
import { ReactTable } from 'src/components';
import { OrderBookTableRow } from './OrderBookTableRow';
import styles from './OrderBook.module.scss';

/**
 * Props.
 */
type OrderBookTableProps = {
    columns: OrderBookTableColumn[];
    data: OrderBookTableData[];
    lastOrderData?: LastOrderData;
    maxVolume: number;
};

type RowWithVolume = Row<OrderBookTableData> & { volume: number };

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
    hiddenColumns: ['type', 'userOrdersAmount'],
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
    maxVolume,
}: OrderBookTableProps): ReactElement {
    const renderRows = useCallback(
        ({ rows, prepareRow }: TableInstance<OrderBookTableData>) => {
            //const bids = rows.filter(x => x.values.type === 'bid');

            return (
                <>
                    <div className={styles.rowsContainer}>
                        {getDataWithVolumes(
                            rows.filter(x => x.values.type === 'ask'),
                            maxVolume,
                        ).map(row => renderRow(row, prepareRow, styles.ask))}
                    </div>
                    {lastOrderData && (
                        <div className={styles.lastOrderDataContainer}>
                            {lastOrderData.cost && (
                                <div className={lastOrderData.type}>{`${lastOrderData.cost.toFixed(
                                    4,
                                )} $`}</div>
                            )}
                            {lastOrderData.eval_time && (
                                <div className="text-muted">{`${lastOrderData.eval_time.toFixed(
                                    4,
                                )} min`}</div>
                            )}
                        </div>
                    )}
                    <div className={styles.rowsContainer}>
                        {getDataWithVolumes(
                            rows.filter(x => x.values.type === 'bid'),
                            maxVolume,
                        ).map(row => renderRow(row, prepareRow, styles.bid))}
                    </div>
                </>
            );
        },
        [lastOrderData, maxVolume],
    );

    return (
        <ReactTable
            name="orderBookTable"
            className={styles.orderBookTable}
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
 * @param className HTML Class.
 * @returns Row.
 */
const renderRow = (
    row: RowWithVolume,
    prepareRow: (r: Row<OrderBookTableData>) => void,
    className: string,
): ReactElement => {
    prepareRow(row);
    return (
        <OrderBookTableRow
            key={row.id}
            row={row}
            volume={row.volume}
            className={className}
        />
    );
};

/**
 * Adds volume data to each order book data item.
 *
 * @param data Data.
 * @param maxVolume Max volume.
 * @returns Data with voulmes.
 */
const getDataWithVolumes = (
    data: Row<OrderBookTableData>[],
    maxVolume: number,
): RowWithVolume[] => {
    let count = 0;

    const finalData = data.map(x => {
        count = count + x.values.ordersAmount;

        return {
            ...x,
            volume: 100 - ((maxVolume - count) / maxVolume) * 100,
        };
    });

    return finalData;
};
