/**
 * @file React functional component.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

import React, { ReactElement, KeyboardEvent, ReactNode } from 'react';
import clsx from 'clsx';
import { useKeyPress } from '../../hooks';
import { KeyboardEventKey } from '../../enums';

/**
 * Props.
 */
export type MenuItemProps = {
    children: ReactNode;
    className?: string;
    disabled?: boolean;
    active?: boolean;
    onSelect?: () => void;
    href?: string;
};

/**
 * Menu item component.
 *
 * @param {MenuItemProps} props - Props.
 * @returns React component.
 */
export const MenuItem = ({
    children,
    className,
    disabled,
    active,
    onSelect,
    href
}: MenuItemProps): ReactElement => {
    const itemClassName = clsx(
        active && 'active',
        className && className,
        disabled && 'disabled'
    );

    const onSelectHandler = (): void => {
        onSelect && !disabled && onSelect();
    };

    const [onSelectWithKey] = useKeyPress(
        onSelectHandler,
        [KeyboardEventKey.enter, KeyboardEventKey.space]
    );

    const onKeyPressHandler = (e: KeyboardEvent<HTMLLIElement>): void => {
        onSelectWithKey(e);
    };

    return (
        <li
            className={itemClassName}
            role="menuitem"
            onClick={onSelectHandler}
            onKeyPress={onKeyPressHandler}
            tabIndex={disabled ? -1 : 0}>
            <a href={href}>
                {children}
            </a>
        </li>
    );
};
