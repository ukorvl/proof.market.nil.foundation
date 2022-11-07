/**
 * @file React component.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

import { ReactElement, useState } from 'react';
import { useAppSelector } from 'src/redux';
import { DashboardCard, Details } from '../../common';
import { ManageOrdersTab } from './ManageOrdersTab';
import { ManageOrdersPanelTabs } from './ManageOrdersPanelTabs';
import './ManageOrdersPanel.scss';

/**
 * Manage orders panel.
 *
 * @returns React component.
 */
export const ManageOrdersPanel = (): ReactElement => {
    const [tab, setTab] = useState<ManageOrdersTab>(ManageOrdersTab.active);
    const selectedCircuitId = useAppSelector(s => s.circuitsState.selectedid);

    return (
        <DashboardCard>
            <Details title={<h4>Manage orders</h4>}>
                <div className="manageOrdersPanel">
                    <ManageOrdersPanelTabs
                        currentTab={tab}
                        onSetTab={setTab}
                    />
                    {selectedCircuitId !== undefined ? (
                        tabFactory(tab)
                    ) : (
                        <h4>Please, select circuit to display orders.</h4>
                    )}
                </div>
            </Details>
        </DashboardCard>
    );
};

/**
 * Renders tab content conditionally.
 *
 * @param tab - Tab.
 * @returns React Element.
 */
const tabFactory = (tab: ManageOrdersTab) => {
    switch (tab) {
        case ManageOrdersTab.active:
            return <></>;
        case ManageOrdersTab.history:
            return <></>;
        default:
            return <></>;
    }
};
