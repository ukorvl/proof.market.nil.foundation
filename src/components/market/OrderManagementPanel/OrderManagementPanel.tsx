/**
 * @file React component.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

import { ReactElement } from 'react';
import { DashboardCard } from '../DashboardCard';
import { Details } from '../../common';

/**
 * Order management panel.
 *
 * @returns React component.
 */
export const OrderManagementPanel = (): ReactElement => {
    return (
        <DashboardCard>
            <Details title={<h4>Manage orders</h4>}></Details>
        </DashboardCard>
    );
};
