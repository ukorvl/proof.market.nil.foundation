/**
 * @file React hook.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

import { useMemo } from 'react';
import { CandlestickData, LineData, UTCTimestamp } from 'lightweight-charts';
import { useSelector } from 'react-redux';
import { dequal as deepEqual } from 'dequal';
import sum from 'lodash/sum';
import { useAppSelector, selectCurrentCircuitAsks } from 'src/redux';
import { Ask, Bid } from 'src/models';
import { getUTCTimestamp } from 'src/utils';

/**
 * Hook return type.
 */
type UseGetCircuitDashboardDataReturnType = {
    chartData: {
        candlestickChartData: CandlestickData[];
        proofGenTimeData: LineData[];
        proofGenCostData: LineData[];
    };
    loadingData: boolean;
};

/**
 * Get data to draw circuit chart.
 *
 * @returns Data to draw circuit chart.
 */
export const useGetCircuitDashboardData = (): UseGetCircuitDashboardDataReturnType => {
    const loadingData = useAppSelector(s => s.circuitsState.isLoading || s.asksState.isLoading);
    const asks = useSelector(selectCurrentCircuitAsks, deepEqual);
    const grouppedOrders = useMemo(() => {
        return asks
            .filter(x => x.status === 'completed' && !!x.timestamp)
            .reduce(reduceOrdersByDate, {});
    }, [asks]);

    const chartData = useMemo(
        () => ({
            candlestickChartData: getCandlestickData(grouppedOrders),
            proofGenTimeData: getProofGenTimeData(grouppedOrders),
            proofGenCostData: getProofGenTimeData(grouppedOrders), // TODO - replace when proof cost will be avial.
        }),
        [grouppedOrders],
    );

    return { chartData, loadingData };
};

/**
 * Creates candleStick data {@link CandlestickData} array from orders, groupped by date.
 *
 * @param ordersGrouppedByDate Orders array.
 * @returns Array of candleStick data.
 */
const getCandlestickData = <T extends Bid | Ask>(
    ordersGrouppedByDate: Record<string, T[]>,
): CandlestickData[] => {
    return Object.keys(ordersGrouppedByDate).map(x => {
        const ordersCosts = ordersGrouppedByDate[x].map(x => x.cost);

        const high = Math.max(...ordersCosts);
        const low = Math.min(...ordersCosts);
        const open = ordersCosts[0];
        const close = ordersCosts[ordersCosts.length - 1];

        return {
            time: Number(x) as UTCTimestamp,
            high,
            low,
            open,
            close,
        };
    });
};

/**
 * Creates line data {@link LineData} array from orders, groupped by date.
 *
 * @param ordersGrouppedByDate Orders array.
 * @returns Array of line data.
 */
const getProofGenTimeData = <T extends Bid | Ask>(
    ordersGrouppedByDate: Record<string, T[]>,
): LineData[] => {
    return Object.keys(ordersGrouppedByDate).map(x => {
        const ordersEvalTime = ordersGrouppedByDate[x].map(x => x.eval_time);
        const meanEvalTime = sum(ordersEvalTime) / ordersEvalTime.length;

        return { time: Number(x) as UTCTimestamp, value: meanEvalTime };
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
    const date = getUTCTimestamp(currentValue.timestamp!, true);

    if (!previousValue[date]) previousValue[date] = [];

    previousValue[date].push(currentValue);

    return previousValue;
};
