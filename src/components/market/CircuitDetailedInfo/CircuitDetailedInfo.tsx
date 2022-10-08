/**
 * @file React component.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

import { ReactElement } from 'react';
import { useSelector } from 'react-redux';
import { DashboardCard } from '../DashboardCard';
import { selectCurrentCircuit } from '../../../redux';

/**
 * Currencies list.
 *
 * @returns React component.
 */
export const CircuitDetailedInfo = (): ReactElement => {
    const currentSelectedCircuit = useSelector(selectCurrentCircuit);

    return (
        <DashboardCard>
            {currentSelectedCircuit?.id}
        </DashboardCard>
    );
};
