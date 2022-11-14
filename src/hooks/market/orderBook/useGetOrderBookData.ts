/**
 * @file React hook.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { SortByFn } from 'react-table';
import { dequal as deepEqual } from 'dequal';
import sum from 'lodash/sum';
import {
    Ask,
    Bid,
    CostAndEvalTime,
    LastOrderData,
    OrderBookTableColumn,
    OrderBookTableData,
} from 'src/models';
import {
    selectCurrentCircuitBids,
    selectCurrentCircuitAsks,
    useAppSelector,
    selectCurrentUserAsks,
    selectCurrentUserBids,
} from 'src/redux';

/**
 * Hook return type.
 */
export type UseGetOrderBookDataReturnType = {
    columns: OrderBookTableColumn[];
    data: OrderBookTableData[];
    loadingData: boolean;
    isError: boolean;
    lastOrderData?: LastOrderData;
    maxVolume: number;
};

/**
 * Groupped orders map.
 */
type GrouppedOrdersMap = Map<string, Array<Bid | Ask>>;

/**
 * Hook to get order book data structured for rendering table.
 *
 * @param itemsLimit - Max count of orderBook items of one type (itemsLimit * 2 overall).
 * @returns Data to render order book table.
 */
export const useGetOrderBookData = (itemsLimit = 25): UseGetOrderBookDataReturnType => {
    const loadingData = useAppSelector(s => s.bidsState.isLoading || s.asksState.isLoading);
    const asks = useSelector(selectCurrentCircuitAsks, deepEqual);
    const bids = useSelector(selectCurrentCircuitBids, deepEqual);
    const userAsks = useSelector(selectCurrentUserAsks, deepEqual);
    const userBids = useSelector(selectCurrentUserBids, deepEqual);
    const isError = useAppSelector(s => s.asksState.error || s.bidsState.error);

    const lastOrderData: LastOrderData = useMemo(() => getLastOrderData(asks), [asks]);

    const columns = useMemo(
        (): OrderBookTableColumn[] => [
            {
                Header: 'Orders',
                accessor: 'ordersAmount',
                disableSortBy: true,
            },
            {
                Header: 'Cost',
                accessor: 'cost',
                sortType: sortFunctionCreator('cost'),
            },
            {
                Header: 'Generation time',
                accessor: 'eval_time',
                sortType: sortFunctionCreator('eval_time'),
            },
            {
                accessor: 'type',
            },
            {
                accessor: 'userOrdersAmount',
            },
        ],
        [],
    );

    const asksData = useMemo(() => {
        return createOrderBookData(
            asks
                .filter(x => x.status === 'created')
                .reduce(reduceOrdersByCostAndEvalTime, new Map()),
            'ask',
            userAsks,
        ).slice(-itemsLimit);
    }, [asks, userAsks, itemsLimit]);

    const bidsData = useMemo(() => {
        return createOrderBookData(
            bids
                .filter(x => x.status === 'created')
                .reduce(reduceOrdersByCostAndEvalTime, new Map()),
            'bid',
            userBids,
        ).slice(0, itemsLimit);
    }, [bids, userBids, itemsLimit]);

    const data = useMemo(
        (): OrderBookTableData[] => asksData.concat(bidsData),
        [asksData, bidsData],
    );

    const maxVolume = useMemo(
        () =>
            Math.max(
                sum(asksData.map(x => x.ordersAmount)) ?? 0,
                sum(bidsData.map(x => x.ordersAmount)) ?? 0,
            ),
        [asksData, bidsData],
    );

    return { columns, data, loadingData, isError, lastOrderData, maxVolume };
};

/**
 * Map groupped trade orders to order book data.
 *
 * @param grouppedOrders Trade orders.
 * @param orderType Bid or Ask.
 * @param userOrders - Orders, created by user.
 * @returns Order book data.
 */
const createOrderBookData = <T extends Bid | Ask>(
    grouppedOrders: GrouppedOrdersMap,
    orderType: 'bid' | 'ask',
    userOrders: T[],
): OrderBookTableData[] => {
    const result: OrderBookTableData[] = [];

    grouppedOrders.forEach((value, key) => {
        const parsedKey: CostAndEvalTime = JSON.parse(key);

        result.push({
            cost: parsedKey?.cost,
            eval_time: parsedKey?.eval_time,
            ordersAmount: value.length,
            type: orderType,
            userOrdersAmount: value.filter(x => userOrders.some(y => y.id === x.id)).length,
        });
    });

    return result;
};

/**
 * Takes orders array and returns dict, where keys are costs, and values are arrays of orders.
 *
 * @param previousValue Initial value.
 * @param currentValue Current value.
 * @returns Orders, grouped by date.
 */
const reduceOrdersByCostAndEvalTime = <T extends Bid | Ask>(
    previousValue: GrouppedOrdersMap,
    currentValue: T,
) => {
    const mapKey = JSON.stringify({
        cost: currentValue.cost,
        eval_time: currentValue.eval_time,
    });

    const value = previousValue.get(mapKey);

    if (!value) {
        previousValue.set(mapKey, [currentValue]);
    } else {
        previousValue.set(mapKey, [...value, currentValue]);
    }

    return previousValue;
};

/**
 * Counts current price value and price changing direction.
 *
 * @param currentAsks Current ask list.
 * @see {CurrentPrice}
 * @returns Current price.
 */
const getLastOrderData = (currentAsks: Ask[]): LastOrderData => {
    const completedAsks = currentAsks.filter(x => x.status === 'completed');

    const latestCost = completedAsks.at(-1)?.cost;
    const prevCost = completedAsks.at(-2)?.cost;

    const getType = () => (latestCost! > prevCost! ? 'grow' : 'loss');
    const type = latestCost && prevCost ? getType() : undefined;

    return {
        cost: latestCost,
        eval_time: completedAsks.at(-1)?.eval_time,
        type,
    };
};

/**
 * Creates react table sort by provided field fucntion.
 *
 * @param sortField Sort field.
 * @returns Sort function.
 */
const sortFunctionCreator = (sortField: keyof OrderBookTableData) => {
    const sortFn: SortByFn<OrderBookTableData> = (rowFirst, rowSecond, _id, desc) => {
        const { values: valuesFirst } = rowFirst;
        const { values: valuesSecond } = rowSecond;
        const isAskFirst = !!valuesFirst.ask;
        const isAskSecond = !!valuesSecond.ask;

        if (isAskFirst && !isAskSecond) {
            return desc ? 1 : -1;
        }

        if (!isAskFirst && isAskSecond) {
            return desc ? -1 : 1;
        }

        return valuesFirst[sortField] - valuesSecond[sortField] > 0 ? 1 : -1;
    };

    return sortFn;
};
