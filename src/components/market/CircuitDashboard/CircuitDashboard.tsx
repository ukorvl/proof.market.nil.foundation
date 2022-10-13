/**
 * @file React component.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

import { ReactElement, useRef } from 'react';
import { Placeholder, PlaceholderAnimation } from '@nilfoundation/react-components';
import { useCharts, useGetCircuitDashboardData } from 'src/hooks';
import { DashboardCard } from '../DashboardCard';
import './CircuitDashboard.scss';

/**
 * Circuit dashboard.
 *
 * @returns React component.
 */
export const CircuitDashboard = (): ReactElement => {
    const ref = useRef<HTMLDivElement>(null);

    const { data, loadingData } = useGetCircuitDashboardData();
    useCharts(ref, data);

    return (
        <DashboardCard>
            <h4>Circuit dashboard</h4>
            <div
                ref={ref}
                className="circuitDashboard"
            >
                {loadingData && <Placeholder animation={PlaceholderAnimation.wave} />}
                {data === undefined && !loadingData && (
                    <h4>Please, select circuit to display data.</h4>
                )}
            </div>
        </DashboardCard>
    );
};
