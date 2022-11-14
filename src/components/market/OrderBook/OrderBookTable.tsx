/**
 * @file React component.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

import { ReactElement, memo, useCallback, useRef, useLayoutEffect } from 'react';
import { Row, TableState } from 'react-table';
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
    const asksContainerRef = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
        const { current: el } = asksContainerRef;
        el && el.scrollTo(0, el.scrollHeight);
    }, []);

    const renderRows = useCallback(
        (rows: Row<OrderBookTableData>[], prepareRow: (row: Row<OrderBookTableData>) => void) => {
            const asks = rows.filter(x => x.values.type === 'ask');
            const bids = rows.filter(x => x.values.type === 'bid');

            return (
                <>
                    <div
                        className={styles.rowsContainer}
                        ref={asksContainerRef}
                    >
                        {getDataWithVolumes(asks, maxVolume, true).map(row =>
                            renderRow(row, prepareRow, styles.ask),
                        )}
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
                                )} ms`}</div>
                            )}
                        </div>
                    )}
                    <div className={styles.rowsContainer}>
                        {getDataWithVolumes(bids, maxVolume).map(row =>
                            renderRow(row, prepareRow, styles.bid),
                        )}
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
 * @param reverse Count volumes in a reverse order.
 * @returns Data with voulmes.
 */
const getDataWithVolumes = (
    data: Row<OrderBookTableData>[],
    maxVolume: number,
    reverse?: boolean,
): RowWithVolume[] => {
    let count = 0;

    const finalData = (reverse ? data.reverse() : data).map(x => {
        count = count + x.values.ordersAmount;

        return {
            ...x,
            volume: 100 - ((maxVolume - count) / maxVolume) * 100,
        };
    });

    return reverse ? finalData.reverse() : finalData;
};
