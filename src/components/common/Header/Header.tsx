/**
 * @file React component.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

import { ReactElement } from 'react';
import { Container, Navbar, Nav } from '@nilfoundation/react-components';
import { Link, useLocation } from 'react-router-dom';
import { navigationLinks } from 'src/constants';
import { MobileMenu } from '../MobileMenu';
import { UserMenu } from '../../login';
import { Breadcrumbs } from '../BreadCrumbs';
import styles from './Header.module.scss';

/**
 * Header.
 *
 * @returns React component.
 */
export const Header = (): ReactElement => {
    const { pathname } = useLocation();

    return (
        <Navbar className={styles.navbar}>
            <Container
                className={styles.container}
                fluid
            >
                <Breadcrumbs />
                <Nav className={styles.nav}>
                    {navigationLinks.map(({ title, path }) => (
                        <Nav.Item
                            key={title}
                            active={pathname.startsWith(path)}
                            renderLink={({ active: _, ...props }) => (
                                <Link
                                    to={path}
                                    {...props}
                                >
                                    <span>{title}</span>
                                </Link>
                            )}
                        />
                    ))}
                </Nav>
                <UserMenu />
                <MobileMenu />
            </Container>
        </Navbar>
    );
};
