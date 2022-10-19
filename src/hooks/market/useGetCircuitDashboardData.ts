/**
 * @file React hook.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

import { useMemo } from 'react';
import { LineData } from 'lightweight-charts';
import { useSelector } from 'react-redux';
import dayjs from 'dayjs';
import { useAppSelector, selectAsks } from 'src/redux';
import { Ask, Bid } from 'src/models';

/**
 * Hook return type.
 */
type UseGetCircuitDashboardDataReturnType = {
    data?: LineData[];
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
        return asks.filter(x => x.status === 'completed' && !!x.timestamp).map(mapOrderToLineData);
    }, [asks]);

    return { data, loadingData };
};

const mapOrderToLineData = <T extends Bid | Ask>({ timestamp, cost }: T): LineData => ({
    time: dayjs(timestamp).format(),
    value: cost,
});
