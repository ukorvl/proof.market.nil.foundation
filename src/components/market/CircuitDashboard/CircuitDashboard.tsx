/**
 * @file React component.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

import { ReactElement, useRef } from 'react';
import { useCharts, useGetCircuitDashboardData } from 'src/hooks';
import { DashboardCard } from '../DashboardCard';

/**
 * Circuit dashboard.
 *
 * @returns React component.
 */
export const CircuitDashboard = (): ReactElement => {
    const ref = useRef<HTMLDivElement>(null);

    const { data } = useGetCircuitDashboardData();
    useCharts(ref, data);

    return (
        <DashboardCard>
            <h4>Circuit dashboard</h4>
            <div
                ref={ref}
                style={{ height: '500px' }}
            ></div>
        </DashboardCard>
    );
};
