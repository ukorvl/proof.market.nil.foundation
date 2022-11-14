/**
 * @file React component.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

import { ReactElement } from 'react';
import { Icon, Nav } from '@nilfoundation/react-components';

/**
 * Props.
 */
type DashboardToolbarProps = {
    disabled: boolean;
};

/**
 * Dashboard toolbar.
 *
 * @param {DashboardToolbarProps} props Props.
 * @returns React component.
 */
export const DashboardToolbar = ({ disabled }: DashboardToolbarProps): ReactElement => {
    return (
        <Nav>
            <Nav.Item disabled={disabled}>
                <Icon iconName="fa-solid fa-expand" />
            </Nav.Item>
        </Nav>
    );
};
