/**
 * @file React component.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

import { ReactElement } from 'react';
import { Dropdown } from '@nilfoundation/react-components';
import { navigationLinks } from '../../../constants';
import './MobileMenu.scss';

/**
 * Mobile menu.
 *
 * @returns React component.
 */
export const MobileMenu = (): ReactElement => {
    return (
        <Dropdown className="mobileMenu pull-right">
            <Dropdown.Button
                iconNameDropdownClosed="fa fa-bars"
                iconNameDropdownOpend="fa fa-times"
            />
            <Dropdown.Menu>
                {navigationLinks.map(({ title, path }) => (
                    <Dropdown.Item
                        href={path}
                        key={title}
                    >
                        {title}
                    </Dropdown.Item>
                ))}
            </Dropdown.Menu>
        </Dropdown>
    );
};
