/**
 * @file React hook.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { dequal as deepEqual } from 'dequal';
import { useAppSelector, selectCurrentCircuitCompletedAsks } from 'src/redux';
import { Ask, TradeHistoryData, TradeHistoryTableColumn, TradeOrderChange } from 'src/models';
import { formatDate } from 'src/utils';

/**
 * UseGetTradeHistoryData hook return type.
 */
export type UseGetTradeHistoryDataReturnType = {
    data: TradeHistoryData[];
    columns: TradeHistoryTableColumn[];
    loadingData: boolean;
    isError: boolean;
};

/**
 * Get data to render trade history table.
 *
 * @param itemsLimit - Limit items to display.
 * @returns Data to render trade history table.
 */
export const useGetTradeHistoryData = (itemsLimit = 25): UseGetTradeHistoryDataReturnType => {
    const loadingData = useAppSelector(s => s.circuitsState.isLoading || s.asksState.isLoading);
    const asks = useSelector(selectCurrentCircuitCompletedAsks, deepEqual);
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
                Header: 'Generation time',
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
    timestamp: formatDate(timestamp!, 'DD.MM HH:mm'),
    cost,
    eval_time,
    type: i !== 0 ? getType(asks.at(i - 1)!.cost, cost) : undefined,
});

/**
 * Returns trade order change type.
 *
 * @param costA Prev cost.
 * @param costB Current cost.
 * @returns Trade order type.
 */
const getType = (costA: number, costB: number): TradeOrderChange => {
    if (costA === costB) {
        return undefined;
    }

    return costA > costB ? 'loss' : 'grow';
};
