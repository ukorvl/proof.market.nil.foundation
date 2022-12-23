/**
 * @file React component.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

import { ReactElement, useCallback } from 'react';
import { Container, Navbar, Nav } from '@nilfoundation/react-components';
import { Link, useLocation } from 'react-router-dom';
import { navigationLinks } from 'src/constants';
import { useAuth } from 'src/hooks';
import { UrlQueryParam } from 'src/enums';
import { Path, isPathProtected } from 'src/routing';
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
    const { isReadonly } = useAuth();

    const getProtectedPathLink = useCallback(
        (path: Path) => (isReadonly ? `${Path.login}/?${UrlQueryParam.ref}=${path}` : path),
        [isReadonly],
    );

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
                            active={pathname === path}
                            renderLink={({ active: _, ...props }) => (
                                <Link
                                    to={isPathProtected(path) ? getProtectedPathLink(path) : path}
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
