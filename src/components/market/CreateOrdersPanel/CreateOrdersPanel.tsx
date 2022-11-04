/**
 * @file React component.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

import { ReactElement, useState } from 'react';
import { useAppSelector } from 'src/redux';
import { DashboardCard, Details } from '../../common';
import { CreateBidForm } from '../CreateBidForm';
import { CreateAskForm } from '../CreateAskForm';
import { CreateOrdersTabs } from './CreateOrdersTabs';
import { CreateOrdersTab } from './CreateOrdersTab';
import './CreateOrdersPanel.scss';

/**
 * Create orders panel.
 *
 * @returns React component.
 */
export const CreateOrdersPanel = (): ReactElement => {
    const [tab, setTab] = useState<CreateOrdersTab>(CreateOrdersTab.buy);
    const selectedCircuitId = useAppSelector(s => s.circuitsState.selectedid);

    return (
        <DashboardCard>
            <Details title={<h4>Create orders</h4>}>
                <CreateOrdersTabs
                    currentTab={tab}
                    onSetTab={setTab}
                />
                <div className="cerateOrdersPanel">{tabFactory(tab, selectedCircuitId)}</div>
            </Details>
        </DashboardCard>
    );
};

/**
 * Renders tab content conditionally.
 *
 * @param tab Selected tab.
 * @param selectedCircuitId Selected circuit id.
 * @returns React Element.
 */
const tabFactory = (tab: CreateOrdersTab, selectedCircuitId?: string) => {
    if (selectedCircuitId === undefined) {
        return <h4>Please, select circuit to create orders.</h4>;
    }

    switch (tab) {
        case CreateOrdersTab.buy:
            return <CreateBidForm />;
        case CreateOrdersTab.sell:
            return <CreateAskForm />;
        default:
            return <></>;
    }
};
