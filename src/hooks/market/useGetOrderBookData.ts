/**
 * @file React hook.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { Ask, Bid, ColumnAccessor, OrderBookTableColumn, OrderBookTableData } from 'src/models';
import { selectBids, selectAsks, useAppSelector } from 'src/redux';

/**
 * Hook return type.
 */
type UseGetOrderBookDataReturnType = {
    columns: OrderBookTableColumn[];
    data: OrderBookTableData[];
    loadingData: boolean;
};

/**
 * Hook to get order book data structured for rendering table.
 *
 * @param itemsLimit - Max count of orderBook items of one type (itemsLimit * 2 overall).
 * @returns Data to render order book table.
 */
export const useGetOrderBookData = (itemsLimit = 12): UseGetOrderBookDataReturnType => {
    const loadingData = useAppSelector(s => s.bidsState.isLoading || s.asksState.isLoading);
    const asks = useSelector(selectAsks);
    const bids = useSelector(selectBids);

    const columns = useMemo(
        (): OrderBookTableColumn[] => [
            {
                Header: 'Bid',
                accessor: ColumnAccessor.bid,
                disableSortBy: true,
            },
            {
                Header: 'Cost',
                accessor: ColumnAccessor.cost,
            },
            {
                Header: 'Eval_time',
                accessor: ColumnAccessor.eval_time,
            },
            {
                Header: 'Ask',
                accessor: ColumnAccessor.ask,
                disableSortBy: true,
            },
        ],
        [],
    );

    const asksData = useMemo(() => {
        return createOrderBookData(
            asks.filter(x => x.status === 'created').reduce(reduceOrdersByCost, {}),
            'ask',
        );
    }, [asks]);

    const bidsData = useMemo(() => {
        return createOrderBookData(
            bids.filter(x => x.status === 'created').reduce(reduceOrdersByCost, {}),
            'bid',
        );
    }, [bids]);

    const data = useMemo(
        (): OrderBookTableData[] =>
            asksData.slice(0, itemsLimit).concat(bidsData.slice(0, itemsLimit)),
        [asksData, bidsData, itemsLimit],
    );

    return { columns, data, loadingData };
};

/**
 * Map groupped trade orders to order book data.
 *
 * @param grouppedOrders Trande order.
 * @param orderType Bid or Ask.
 * @returns Order book data.
 */
const createOrderBookData = <T extends Ask | Bid>(
    grouppedOrders: Record<string, T[]>,
    orderType: 'bid' | 'ask',
): OrderBookTableData[] => {
    return Object.keys(grouppedOrders).map(x => {
        return {
            cost: x,
            eval_time: x,
            [orderType]: grouppedOrders[x].length.toString(),
        };
    });
};

/**
 * Takes orders array and returns dict, where keys are costs, and values are arrays of orders.
 *
 * @param previousValue Initial value.
 * @param currentValue Current value.
 * @returns Orders, grouped by date.
 */
const reduceOrdersByCost = <T extends Bid | Ask>(
    previousValue: Record<string, T[]>,
    currentValue: T,
) => {
    const cost = currentValue.cost.toFixed(2);

    if (!previousValue[cost]) previousValue[cost] = [];

    previousValue[cost].push(currentValue);

    return previousValue;
};
