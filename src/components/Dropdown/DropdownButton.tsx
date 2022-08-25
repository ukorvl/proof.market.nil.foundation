/**
 * @file React functional component.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

import React, { ReactElement, useContext } from 'react';
import { Button, ButtonProps } from '../Button';
import { Icon } from '../Icon';
import { DropdownContext } from './DropdownContext';

/**
 * Props.
 */
export type DropdownButtonProps = {
    iconNameDropdownOpend?: string;
    iconNameDropdownClosed?: string;
} & ButtonProps;

/**
 * Dropdown button component.
 *
 * @param {DropdownButtonProps} props - Props.
 * @returns React component.
 */
export const DropdownButton = ({
    children,
    className,
    iconNameDropdownOpend,
    iconNameDropdownClosed
}: DropdownButtonProps): ReactElement => {
    const {dropdownId, visible, onDropdownToggle} = useContext(DropdownContext);
    const iconName = visible
        ? iconNameDropdownOpend ?? 'caret-up'
        : iconNameDropdownClosed ?? 'caret-down';

    return (
        <Button
            id={dropdownId}
            active={visible}
            className={`dropdown-toggle ${className ? className : ''}`}
            onClick={(): void => onDropdownToggle(!visible)}>
            {children}
            <Icon iconName={iconName} />
        </Button>
    );
};
