/**
 * @file React component.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

import { ReactElement, useContext } from 'react';
import { Nav } from '@nilfoundation/react-components';
import { OrderManagementContext } from '../OrderManagementContextProvider';
import { CreateOrdersTab } from './CreateOrdersTab';

/**
 * Props.
 */
type OrderManagementTabsProps = {
    currentTab: CreateOrdersTab;
    onSetTab: (t: CreateOrdersTab) => void;
};

/**
 * Order management panel.
 *
 * @param {OrderManagementTabsProps} props Props.
 * @returns React component.
 */
export const CreateOrdersTabs = ({
    currentTab,
    onSetTab,
}: OrderManagementTabsProps): ReactElement => {
    const { processing } = useContext(OrderManagementContext);

    return (
        <Nav justified>
            {Object.values(CreateOrdersTab).map(t => (
                <Nav.Item
                    key={t}
                    onClick={() => onSetTab(t)}
                    active={t === currentTab}
                    disabled={processing}
                >
                    {t}
                </Nav.Item>
            ))}
        </Nav>
    );
};
