/**
 * @file React component.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

import { ReactElement, useContext, useMemo } from 'react';
import { useGetCircuitDashboardData } from 'src/hooks';
import colors from 'src/styles/export.module.scss';
import { ChartTemplate } from '../ChartTemplate';
import { ChartSettingsContext } from '../CircuitDashboard';

/**
 * Proof cost chart.
 *
 * @returns React component.
 */
export const ProofTimeGenChart = (): ReactElement => {
    const seriesOptions = useMemo(
        () => ({
            color: colors.infoColor,
        }),
        [],
    );
    const { dataRange } = useContext(ChartSettingsContext);
    const {
        chartData: { proofGenTimeData },
        loadingData: isLoadingChartData,
    } = useGetCircuitDashboardData(dataRange);

    return (
        <ChartTemplate
            loadingData={isLoadingChartData}
            chartName="Proof Generation Time, min"
            seriesData={proofGenTimeData}
            seriesType="Line"
            seriesOptions={seriesOptions}
        />
    );
};
