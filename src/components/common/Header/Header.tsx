/**
 * @file React component.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

import { ReactElement } from 'react';
import { Container, Navbar, Nav } from '@nilfoundation/react-components';
import { Link, useLocation } from 'react-router-dom';
import { navigationLinks } from 'src/constants';
import { MobileMenu } from '../MobileMenu';
import { UserMenu } from '../UserMenu';
import { Breadcrumbs } from '../BreadCrumbs';
import './Header.scss';

/**
 * Header.
 *
 * @returns React component.
 */
export const Header = (): ReactElement => {
    const { pathname } = useLocation();

    return (
        <Navbar>
            <Container
                className="headerContainer"
                fluid
            >
                <Breadcrumbs />
                <Nav className="navbar-right navbar-nav">
                    {navigationLinks.map(({ title, path }) => (
                        <li key={title}>
                            <Link
                                to={path}
                                className={pathname === path ? 'active' : ''}
                            >
                                <span>{title}</span>
                            </Link>
                        </li>
                    ))}
                </Nav>
                <UserMenu />
                <MobileMenu />
            </Container>
        </Navbar>
    );
};
