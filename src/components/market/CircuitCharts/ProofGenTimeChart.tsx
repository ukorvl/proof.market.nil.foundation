/**
 * @file React component.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

import { ReactElement, useMemo, useRef } from 'react';
import { useChart, useGetCircuitDashboardData, useRenderChartData } from 'src/hooks';
import colors from 'src/styles/export.module.scss';
import { ChartTemplate } from './ChartTemplate';

/**
 * Proof cost chart.
 *
 * @returns React component.
 */
export const ProofTimeGenChart = (): ReactElement => {
    const ref = useRef<HTMLDivElement>(null);
    const { chart } = useChart(ref);
    const options = useMemo(() => ({ color: colors.infoColor }), []);
    const {
        chartData: { proofGenTimeData },
        loadingData,
    } = useGetCircuitDashboardData();

    const { price } = useRenderChartData({
        seriesType: 'Line',
        seriesData: proofGenTimeData,
        chart,
        options,
    });

    return (
        <ChartTemplate
            loadingData={loadingData}
            price={price}
            chartName="Proof Gen Time, ms"
            ref={ref}
        />
    );
};
