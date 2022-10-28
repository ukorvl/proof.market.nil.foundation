/**
 * @file React component.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

import { ReactElement, useContext } from 'react';
import { Nav } from '@nilfoundation/react-components';
import { OrderManagementPanelContext } from '../OrderManagementPanel';
import { Tab } from './Tab';

/**
 * Props.
 */
type OrderManagementTabsProps = {
    currentTab: Tab;
    onSetTab: (t: Tab) => void;
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
    const { processing } = useContext(OrderManagementPanelContext);

    return (
        <Nav justified>
            {Object.values(Tab).map(t => (
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
