/**
 * @file React hook.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

import { useMemo } from 'react';
import { CandlestickData } from 'lightweight-charts';
import { useSelector } from 'react-redux';
import dayjs from 'dayjs';
import { useAppSelector, selectAsks } from 'src/redux';
import { Ask, Bid } from 'src/models';

/**
 * Hook return type.
 */
type UseGetCircuitDashboardDataReturnType = {
    data: CandlestickData[];
    loadingData: boolean;
};

/**
 * Get data to draw circuit chart.
 *
 * @returns Data to draw circuit chart.
 */
export const useGetCircuitDashboardData = (): UseGetCircuitDashboardDataReturnType => {
    const loadingData = useAppSelector(s => s.circuitsState.isLoading);
    const asks = useSelector(selectAsks);
    const data = useMemo(() => {
        const grouppedOrders = asks
            .filter(x => x.status === 'completed' && !!x.timestamp)
            .reduce(reduceOrdersByDate, {});

        return createCandlestickData(grouppedOrders);
    }, [asks]);

    return { data, loadingData };
};

/**
 * Creates candleStick data {@link CandlestickData} array from orders, groupped by date.
 *
 * @param ordersGrouppedByDate Orders array.
 * @returns Array of candleStick data.
 */
const createCandlestickData = <T extends Bid | Ask>(
    ordersGrouppedByDate: Record<string, T[]>,
): CandlestickData[] => {
    return Object.keys(ordersGrouppedByDate).map(x => {
        const ordersCosts = ordersGrouppedByDate[x].map(x => x.cost);

        const high = Math.max(...ordersCosts);
        const low = Math.min(...ordersCosts);
        const open = ordersCosts[0];
        const close = ordersCosts[-1];

        return {
            time: x,
            high,
            low,
            open,
            close,
        };
    });
};

/**
 * Takes orders array and returns dict, where keys are dates, and values are arrays of orders.
 *
 * @param previousValue Initial value.
 * @param currentValue Current value.
 * @returns Orders, grouped by date.
 */
const reduceOrdersByDate = <T extends Bid | Ask>(
    previousValue: Record<string, T[]>,
    currentValue: T,
) => {
    const date = dayjs(currentValue.timestamp).format('YYYY-MM-DD');

    if (!previousValue[date]) previousValue[date] = [];

    previousValue[date].push(currentValue);

    return previousValue;
};
