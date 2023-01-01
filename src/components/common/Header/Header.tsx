/**
 * @file React component.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

import { ReactElement } from 'react';
import { Container, Navbar, Nav } from '@nilfoundation/react-components';
import { navigationLinks } from 'src/constants';
import { MobileMenu } from '../MobileMenu';
import { UserMenu } from '../../login';
import { Breadcrumbs } from '../BreadCrumbs';
import { HeaderLink } from './HeaderLink';
import styles from './Header.module.scss';

/**
 * Header.
 *
 * @returns React component.
 */
export const Header = (): ReactElement => {
    return (
        <Navbar className={styles.navbar}>
            <Container
                className={styles.container}
                fluid
            >
                <Breadcrumbs />
                <Nav className={styles.nav}>
                    {navigationLinks.map(({ title, path }) => (
                        <HeaderLink
                            key={path}
                            title={title}
                            to={path}
                        />
                    ))}
                </Nav>
                <UserMenu />
                <MobileMenu />
            </Container>
        </Navbar>
    );
};
