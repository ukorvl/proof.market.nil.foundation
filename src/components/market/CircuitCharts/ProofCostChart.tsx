/**
 * @file React component.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

import { ReactElement, useMemo, useRef } from 'react';
import { LineWidth } from 'lightweight-charts';
import { useChart, useGetCircuitDashboardData, useRenderChartData } from 'src/hooks';
import colors from 'src/styles/export.module.scss';
import { ChartTemplate } from './ChartTemplate';

/**
 * Proof cost chart.
 *
 * @returns React component.
 */
export const ProofCostChart = (): ReactElement => {
    const ref = useRef<HTMLDivElement>(null);
    const seriesOptions = useMemo(
        () => ({
            upColor: colors.successColor,
            downColor: colors.dangerColor,
            priceLineWidth: 2 as LineWidth,
        }),
        [],
    );
    const {
        chartData: { candlestickChartData },
        loadingData: isLoadingChartData,
    } = useGetCircuitDashboardData();
    const { chart } = useChart({ ref });

    const { price } = useRenderChartData({
        seriesType: 'Candlestick',
        seriesData: candlestickChartData,
        chart,
        options: seriesOptions,
    });

    return (
        <ChartTemplate
            loadingData={isLoadingChartData}
            emptyData={!candlestickChartData.length}
            price={price}
            chartName="Proof cost, USD"
            ref={ref}
        />
    );
};
