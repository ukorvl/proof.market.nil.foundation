/**
 * @file React hook.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { dequal as deepEqual } from 'dequal';
import { useAppSelector, selectCurrentCircuitAsks, selectCurrentUserBids } from 'src/redux';
import { Ask, TradeHistoryData, TradeHistoryTableColumn } from 'src/models';
import { formatDate } from 'src/utils';

/**
 * UseGetManageOrdersData hook return type.
 */
export type UseGetManageOrdersDataReturnType = {
    data: TradeHistoryData[];
    columns: TradeHistoryTableColumn[];
    loadingData: boolean;
    isError: boolean;
};

/**
 * Get data to render manage orders panel.
 *
 * @param itemsLimit - Limit items to display.
 * @returns Data to render manage orders panel.
 */
export const useGetManageOrdersData = (itemsLimit = 25): UseGetManageOrdersDataReturnType => {
    const loadingData = useAppSelector(s => s.bidsState.isLoading || s.asksState.isLoading);
    const asks = useSelector(selectCurrentCircuitAsks, deepEqual);
    const bids = useSelector(selectCurrentUserBids, deepEqual);
    const isError = useAppSelector(s => s.asksState.error || s.bidsState.error);

    const columns = useMemo(
        (): TradeHistoryTableColumn[] => [
            {
                Header: 'Time',
                accessor: 'timestamp',
            },
            {
                Header: 'Cost',
                accessor: 'cost',
            },
            {
                Header: 'Eval_time',
                accessor: 'eval_time',
            },
            {
                accessor: 'type',
            },
        ],
        [],
    );

    const data = useMemo(
        () => asks.map(mapToTradeHistoryData).slice(-itemsLimit),
        [asks, itemsLimit],
    );

    return { data, columns, loadingData, isError };
};

/**
 * Maps asks list to trade history table data list.
 *
 * @param {Ask} ask - Current ask.
 * @param i Current index.
 * @param asks Asks array.
 * @returns Trade history table data list.
 */
const mapToTradeHistoryData = (
    { timestamp, cost, eval_time }: Ask,
    i: number,
    asks: Ask[],
): TradeHistoryData => ({
    timestamp: formatDate(timestamp!, 'DD.MM hh:mm'),
    cost,
    eval_time,
    type: i !== 0 ? (asks.at(i - 1)!.cost > cost ? 'loss' : 'grow') : undefined,
});
