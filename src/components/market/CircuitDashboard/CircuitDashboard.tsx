/**
 * @file React component.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

import { ReactElement, useState } from 'react';
import { Details } from 'src/components';
import { ChartType } from 'src/enums';
import { DashboardCard } from '../../common';
import { ChartTypeSelect } from './ChartTypeSelect';
import { ProofCostChart, ProofGenCostChart, ProofTimeGenChart } from '../CircuitCharts';

/**
 * Circuit dashboard.
 *
 * @returns React component.
 */
export const CircuitDashboard = (): ReactElement => {
    const [chartType, setChartType] = useState(ChartType.proofCostChart);

    return (
        <DashboardCard>
            <Details title={<h4>Circuit dashboard</h4>}>
                <ChartTypeSelect
                    chartType={chartType}
                    onSelectChartType={setChartType}
                />
                <div>
                    <ChartFactory chartType={chartType} />
                </div>
            </Details>
        </DashboardCard>
    );
};

/**
 * Renders chart depending on its type.
 *
 * @param {{chartType: ChartType}} props Props.
 * @returns Chart.
 */
const ChartFactory = ({ chartType }: { chartType: ChartType }) => {
    switch (chartType) {
        case ChartType.proofCostChart:
            return <ProofCostChart />;
        case ChartType.proofGetTimeChart:
            return <ProofTimeGenChart />;
        case ChartType.proofGenCostChart:
            return <ProofGenCostChart />;
        default:
            return <></>;
    }
};
