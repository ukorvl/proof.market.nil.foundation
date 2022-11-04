/**
 * @file React component.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

import { ReactElement, useState } from 'react';
import { DashboardCard, Details } from '../../common';
import { ManageOrdersTab } from './ManageOrdersTab';
import './ManageOrdersPanel.scss';

/**
 * Manage orders panel.
 *
 * @returns React component.
 */
export const ManageOrdersPanel = (): ReactElement => {
    const [tab, setTab] = useState<ManageOrdersTab>(ManageOrdersTab.active);

    return (
        <DashboardCard>
            <Details title={<h4>Manage orders</h4>}>
                <div className="manageOrdersPanel">{tabFactory()}</div>
            </Details>
        </DashboardCard>
    );
};

/**
 * Renders tab content conditionally.
 *
 * @returns React Element.
 */
const tabFactory = () => {
    return <></>;
};
