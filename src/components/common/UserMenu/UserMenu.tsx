/**
 * @file React component.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

import { ReactElement } from 'react';
import { Dropdown, Icon, Variant } from '@nilfoundation/react-components';
import { useAuth } from '../../../hooks';
import './UserMenu.scss';

/**
 * User menu.
 *
 * @returns React component.
 */
export const UserMenu = (): ReactElement => {
    const { user, processLogout } = useAuth();

    return (
        <Dropdown className="userMenu">
            <Dropdown.Button variant={Variant.info}>
                <Icon iconName="fa-solid fa-circle-user" />
                {user}
            </Dropdown.Button>
            <Dropdown.Menu className="dropdown-menu-right">
                <Dropdown.Item onSelect={processLogout}>Logout</Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
    );
};
