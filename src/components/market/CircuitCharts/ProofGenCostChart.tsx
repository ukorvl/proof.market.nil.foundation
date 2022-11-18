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
 * Proof gen cost chart.
 *
 * @returns React component.
 */
export const ProofGenCostChart = (): ReactElement => {
    const seriesOptions = useMemo(
        () => ({
            color: colors.infoColor,
        }),
        [],
    );
    const { dataRange } = useContext(ChartSettingsContext);
    const {
        chartData: { proofGenCostData },
        loadingData,
    } = useGetCircuitDashboardData(dataRange);

    return (
        <ChartTemplate
            loadingData={loadingData}
            chartName="Proof Generation Cost, USD"
            seriesData={proofGenCostData}
            seriesType="Line"
            seriesOptions={seriesOptions}
        />
    );
};
