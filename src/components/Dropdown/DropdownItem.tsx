/**
 * @file React functional component.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

import React, { ReactElement, useContext } from 'react';
import { DropdownContext } from './DropdownContext';
import { MenuItem, MenuItemProps } from '../Menu';

/**
 * Props.
 */
export type DropdownProps = MenuItemProps;

/**
 * Dropdown menuitem component.
 *
 * @param {DropdownItemProps} props - Props.
 * @returns React component.
 */
export const DropdownItem = ({children, onSelect, disabled, ...rest}: DropdownProps): ReactElement => {
    const {visible, onDropdownToggle} = useContext(DropdownContext);

    const dropdownItemSelectHandler = (): void => {
        if (disabled) {
            return;
        }

        onSelect && onSelect();
        onDropdownToggle(!visible);
    };

    return (
        <MenuItem
            onSelect={dropdownItemSelectHandler}
            {...rest}
        >
            {children}
        </MenuItem>
    );
};
