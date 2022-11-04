/**
 * @file React component.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

import { ReactElement } from 'react';
import { DashboardCard, Details } from '../../common';

/**
 * Manage orders panel tabs.
 *
 * @returns React component.
 */
export const ManageOrdersPanelTabs = (): ReactElement => {
    return (
        <DashboardCard>
            <Details title={<h4>Manage orders</h4>}>
                <div>Open orders / orders history</div>
            </Details>
        </DashboardCard>
    );
};
