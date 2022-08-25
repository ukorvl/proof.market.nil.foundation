/**
 * @file React functional component.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

import clsx from 'clsx';
import React, { ReactElement, ReactNode } from 'react';
import { NavListElement } from './NavListElement';
import { NavListContext } from './NavListContext';
import './NavList.scss';

/**
 * Props.
 */
export type NavListProps = {
    children: ReactNode;
    className?: string;
    onToggle?: () => void;
    vertical?: boolean;
}

/**
 * Panel image component.
 *
 * @param {NavListProps} props - Props.
 * @returns React component.
 */
export const NavList = ({ children, className, onToggle, vertical = false }: NavListProps): ReactElement => {
    const navListClassName = clsx(
        'nav',
        'navbar-nav',
        className && className,
        vertical && 'nav-stacked'
    );

    return (
        <NavListContext.Provider value={{onToggle}}>
            <ul
                className={navListClassName}
                role="navigation"
                aria-label="page navigation">
                { children }
            </ul>
        </NavListContext.Provider>
    );
};

/**
 * Component extensions.
 */
NavList.Link = NavListElement;
