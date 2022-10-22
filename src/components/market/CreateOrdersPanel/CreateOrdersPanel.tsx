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
import { Tab } from './Tab';
import './CreateOrdersPanel.scss';

/**
 * Create orders panel.
 *
 * @returns React component.
 */
export const CreateOrdersPanel = (): ReactElement => {
    const [tab, setTab] = useState<Tab>(Tab.buy);
    const selectedCircuitId = useAppSelector(s => s.circuitsState.selectedid);

    const tabFactory = () => {
        if (selectedCircuitId === undefined) {
            return <h4>Please, select circuit to create orders.</h4>;
        }

        switch (tab) {
            case Tab.buy:
                return <CreateBidForm />;
            case Tab.sell:
                return <CreateAskForm />;
            default:
                return <></>;
        }
    };

    return (
        <DashboardCard>
            <Details title={<h4>Manage orders</h4>}>
                <CreateOrdersTabs
                    currentTab={tab}
                    onSetTab={setTab}
                />
                <div className="cerateOrdersPanel">{tabFactory()}</div>
            </Details>
        </DashboardCard>
    );
};
