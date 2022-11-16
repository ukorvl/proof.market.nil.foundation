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
    isFullscreen: boolean;
    setFullScreen: (x: boolean) => void;
};

/**
 * Dashboard toolbar.
 *
 * @param {DashboardToolbarProps} props Props.
 * @returns React component.
 */
export const DashboardToolbar = ({
    disabled,
    isFullscreen,
    setFullScreen,
}: DashboardToolbarProps): ReactElement => {
    return (
        <Nav>
            <Nav.Item
                disabled={disabled}
                active={isFullscreen}
                onClick={() => setFullScreen(!isFullscreen)}
            >
                <Icon iconName={`fa-solid fa-${isFullscreen ? 'compress' : 'expand'}`} />
            </Nav.Item>
        </Nav>
    );
};
