/**
 * @file React component.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

import { ReactElement, useRef } from 'react';
import { Placeholder, PlaceholderAnimation } from '@nilfoundation/react-components';
import { useCharts, useGetCircuitDashboardData } from 'src/hooks';
import { Details } from 'src/components';
import { DashboardCard } from '../../common';
import { ChartLegend } from './ChartLegend';
import './CircuitDashboard.scss';

/**
 * Circuit dashboard.
 *
 * @returns React component.
 */
export const CircuitDashboard = (): ReactElement => {
    const ref = useRef<HTMLDivElement>(null);
    const { data, loadingData } = useGetCircuitDashboardData();
    const { price } = useCharts(ref, data);

    return (
        <DashboardCard>
            <Details title={<h4>Circuit dashboard</h4>}>
                <div
                    ref={ref}
                    className="circuitDashboard"
                >
                    {data && (
                        <ChartLegend
                            price={price}
                            name="Proof time gen"
                        />
                    )}
                    {loadingData && <Placeholder animation={PlaceholderAnimation.wave} />}
                    {data === undefined && !loadingData && (
                        <h4>Please, select circuit to display data.</h4>
                    )}
                </div>
            </Details>
        </DashboardCard>
    );
};
