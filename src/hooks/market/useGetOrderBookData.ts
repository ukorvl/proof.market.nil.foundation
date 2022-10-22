/**
 * @file React hook.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { UseSortByColumnProps } from 'react-table';
import { selectBids, selectAsks, useAppSelector } from 'src/redux';

/**
 * Hook return type.
 */
type UseGetOrderBookDataReturnType = {
    columns: OrderBookTableColumn[];
    data: OrderBookTableData[];
    loadingData: boolean;
};

enum Accessor {
    bid = 'bid',
    ask = 'ask',
    price = 'price',
    eval_time = 'eval_time',
}

/**
 * Column.
 */
export type OrderBookTableColumn = {
    Header: string;
    accessor: Accessor;
} & Partial<UseSortByColumnProps<any>>;

/**
 * Data.
 */
export type OrderBookTableData = {
    [key in Accessor]?: number;
} & Partial<UseSortByColumnProps<any>>;

/**
 * Hook to get order book data structured for rendering table.
 *
 * @returns Data to render order book table.
 */
export const useGetOrderBookData = (): UseGetOrderBookDataReturnType => {
    const loadingData = useAppSelector(s => s.circuitsState.isLoading);
    const asks = useSelector(selectAsks);
    const bids = useSelector(selectBids);

    const columns = useMemo(
        () => [
            {
                Header: 'Bid',
                accessor: Accessor.bid,
            },
            {
                Header: 'Price',
                accessor: Accessor.price,
                defaultCanSort: true,
            },
            {
                Header: 'Eval_time',
                accessor: Accessor.eval_time,
                defaultCanSort: true,
            },
            {
                Header: 'Ask',
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
        [asks, bids],
    );

    return { columns, data, loadingData };
};
