/**
 * @file React component.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

import { ReactElement, useState } from 'react';
import { Nav } from '@nilfoundation/react-components';
import { DashboardCard } from '../DashboardCard';
import { Details } from '../../common';
import { CreateOrderForm } from '../CreateOrderForm';
import './OrderManagementPanel.scss';

/**
 * Tab.
 */
enum Tab {
    orders = 'Create order',
    proposals = 'Create proposal',
}

/**
 * Order management panel.
 *
 * @returns React component.
 */
export const OrderManagementPanel = (): ReactElement => {
    const [tab, setTab] = useState<Tab>(Tab.orders);

    const tabFactory = () => {
        switch (tab) {
            case Tab.orders:
                return <CreateOrderForm />;
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
                        >
                            {t}
                        </Nav.Item>
                    ))}
                </Nav>
                <div className="orderManagementPanel">{tabFactory()}</div>
            </Details>
        </DashboardCard>
    );
};
