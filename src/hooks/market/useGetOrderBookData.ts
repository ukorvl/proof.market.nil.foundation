/**
 * @file React hook.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { selectOrders, selectProposals, useAppSelector } from 'src/redux';

/**
 * Hook return type.
 */
type UseGetOrderBookDataReturnType = {
    columns: OrderBookTableColumn[];
    data: OrderBookTableData[];
    loadingData: boolean;
};

enum OrderBookItemType {
    bid = 'bid',
    ask = 'ask',
}

type OrderBookItem = {
    type: OrderBookItemType;
    time: number;
};

enum Accessor {
    bid = 'bid',
    ask = 'ask',
    price = 'price',
}

/**
 * Column.
 */
export type OrderBookTableColumn = {
    Header: string;
    accessor: Accessor;
};

/**
 * Data.
 */
export type OrderBookTableData = {
    [key in Accessor]?: number;
} & {
    percent?: number;
};

/**
 * Hook to get order book data structured for rendering table.
 *
 * @returns Data to render order book table.
 */
export const useGetOrderBookData = (): UseGetOrderBookDataReturnType => {
    const loadingData = useAppSelector(s => s.circuitsState.isLoading);
    const proposals = useSelector(selectProposals);
    const orders = useSelector(selectOrders);

    const columns = useMemo(
        () => [
            {
                Header: 'Bid',
                accessor: Accessor.bid,
            },
            {
                Header: 'Ask',
                accessor: Accessor.price,
            },
            {
                Header: 'Asks',
                accessor: Accessor.ask,
            },
        ],
        [],
    );

    const data = useMemo(
        () => [
            {
                ask: 321,
                price: 1000,
                id: 2,
            },
            {
                ask: 321,
                price: 3000,
            },
            {
                bid: 1233,
                price: 4000,
            },
        ],
        [],
    );

    return { columns, data, loadingData };
};

// const getMaxAmount = (values: number[]) => Math.max.apply(null, values);
// const getMinAmount = (values: number[]) => Math.min.apply(null, values);
