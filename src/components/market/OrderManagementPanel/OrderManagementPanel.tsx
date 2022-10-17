/**
 * @file React component.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

import { ReactElement, useState } from 'react';
import { Nav } from '@nilfoundation/react-components';
import { DashboardCard, Details } from '../../common';
import { CreateBidForm } from '../CreateBidForm';
import { CreateAskForm } from '../CreateAskForm';
import { OrderManagementPanelContext } from './OrderManagementPanelContext';
import './OrderManagementPanel.scss';

/**
 * Tab.
 */
enum Tab {
    buy = 'BUY',
    sell = 'SELL',
}

/**
 * Order management panel.
 *
 * @returns React component.
 */
export const OrderManagementPanel = (): ReactElement => {
    const [tab, setTab] = useState<Tab>(Tab.buy);
    const [processing, setProcessing] = useState(false);

    const tabFactory = () => {
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
                <Nav>
                    {Object.values(Tab).map(t => (
                        <Nav.Item
                            key={t}
                            onClick={() => setTab(t)}
                            active={t === tab}
                            disabled={processing}
                        >
                            {t}
                        </Nav.Item>
                    ))}
                </Nav>
                <OrderManagementPanelContext.Provider value={{ processing, setProcessing }}>
                    <div className="orderManagementPanel">{tabFactory()}</div>
                </OrderManagementPanelContext.Provider>
            </Details>
        </DashboardCard>
    );
};
