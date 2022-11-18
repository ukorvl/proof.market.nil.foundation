/**
 * @file React component.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

import { ReactElement, useState } from 'react';
import { Details } from 'src/components';
import { ChartType, DateUnit } from 'src/enums';
import { useLocalStorage } from 'src/hooks';
import { DashboardCard, FullScreenView } from '../../common';
import { ChartTypeSelect } from './ChartTypeSelect';
import { DataRangeSelect } from './DataRangeSelect';
import { ProofCostChart, ProofTimeGenChart } from '../CircuitCharts';
import { ChartSettingsContext } from './ChartSettingsContext';
import { DashboardToolbar } from './DashboardToolbar';
import './CircuitDashboard.scss';

/**
 * Circuit dashboard.
 *
 * @returns React component.
 */
export const CircuitDashboard = (): ReactElement => {
    const [chartType, setChartType] = useState(ChartType.proofCostChart);
    const [fullScreen, setFullScreen] = useState(false);
    const [dataRange, setDataRange] = useLocalStorage<DateUnit>(
        'circuitDashboardDataRange',
        DateUnit.hour,
    );

    return (
        <DashboardCard className="circuitDashboard">
            <Details title={<h4>Circuit dashboard</h4>}>
                <ChartTypeSelect
                    chartType={chartType}
                    onSelectChartType={setChartType}
                    disabled={false}
                />
                <FullScreenView
                    showFullScreen={fullScreen}
                    className="fullScreenChartContainer"
                >
                    <div className="circuitDashboard__toolbar">
                        <DataRangeSelect
                            currentDataRange={dataRange}
                            setDataRange={setDataRange}
                            disabled={false}
                        />
                        <DashboardToolbar
                            disabled={false}
                            isFullscreen={fullScreen}
                            setFullScreen={setFullScreen}
                        />
                    </div>
                    <ChartSettingsContext.Provider value={{ dataRange }}>
                        <ChartFactory chartType={chartType} />
                    </ChartSettingsContext.Provider>
                </FullScreenView>
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
