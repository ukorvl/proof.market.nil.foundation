/**
 * @file React component.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

import { ReactElement, useContext } from 'react';
import { Icon, Nav } from '@nilfoundation/react-components';
import { ChartSettingsContext } from './ChartSettingsContext';

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
    const { displayVolumes, setDisplayVolumes } = useContext(ChartSettingsContext);

    return (
        <Nav>
            <Nav.Item
                disabled={disabled}
                active={displayVolumes}
                onClick={() => setDisplayVolumes(!displayVolumes)}
            >
                <Icon iconName="fa-solid fa-chart-simple" />
            </Nav.Item>
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
