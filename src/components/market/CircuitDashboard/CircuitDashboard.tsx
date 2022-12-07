/**
 * @file React component.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

import { ReactElement, useState } from 'react';
import { Details } from 'src/components';
import { ChartType } from 'src/enums';
import { selectCurrentCircuit, useAppSelector } from 'src/redux';
import { DashboardCard, FullScreenView } from '../../common';
import { ChartTypeSelect } from './ChartTypeSelect';
import { DataRangeSelect } from './DataRangeSelect';
import { ProofCostChart, ProofTimeGenChart } from '../CircuitCharts';
import { ChartSettingsProvider } from './ChartSettingsProvider';
import { DashboardToolbar } from './DashboardToolbar';
import { FullScreenChartInfo } from './FullScreenChartInfo';
import './CircuitDashboard.scss';

/**
 * Circuit dashboard.
 *
 * @returns React component.
 */
export const CircuitDashboard = (): ReactElement => {
    const currentCircuit = useAppSelector(selectCurrentCircuit);
    const [chartType, setChartType] = useState(ChartType.proofCostChart);
    const [fullScreen, setFullScreen] = useState(false);

    return (
        <DashboardCard>
            <Details title={<h4>Circuit dashboard</h4>}>
                <div className="circuitDashboard">
                    <ChartSettingsProvider>
                        <ChartTypeSelect
                            chartType={chartType}
                            onSelectChartType={setChartType}
                            disabled={!currentCircuit}
                        />
                        <FullScreenView
                            showFullScreen={fullScreen}
                            className="fullScreenChartContainer"
                        >
                            {fullScreen && <FullScreenChartInfo />}
                            <div className="circuitDashboard__toolbar">
                                <DataRangeSelect disabled={!currentCircuit} />
                                <DashboardToolbar
                                    disabled={!currentCircuit}
                                    isFullscreen={fullScreen}
                                    setFullScreen={setFullScreen}
                                />
                            </div>
                            <ChartFactory chartType={chartType} />
                        </FullScreenView>
                    </ChartSettingsProvider>
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
        default:
            return <></>;
    }
};
