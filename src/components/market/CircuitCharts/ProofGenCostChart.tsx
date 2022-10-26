/**
 * @file React component.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

import { ReactElement, useMemo, useRef } from 'react';
import { useChart, useGetCircuitDashboardData, useRenderChartData } from 'src/hooks';
import colors from 'src/styles/export.module.scss';
import { ChartTemplate } from './ChartTemplate';

/**
 * Proof gen cost chart.
 *
 * @returns React component.
 */
export const ProofGenCostChart = (): ReactElement => {
    const ref = useRef<HTMLDivElement>(null);
    const options = useMemo(() => ({ color: colors.infoColor }), []);
    const { chart } = useChart(ref);
    const {
        chartData: { proofGenCostData },
        loadingData,
    } = useGetCircuitDashboardData();

    const { price } = useRenderChartData({
        seriesType: 'Line',
        seriesData: proofGenCostData,
        chart,
        options,
    });

    return (
        <ChartTemplate
            loadingData={loadingData}
            price={price}
            chartName="Proof Gen Cost, USD"
            ref={ref}
        />
    );
};
