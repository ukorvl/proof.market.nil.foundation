/**
 * @file React component.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

import { ReactElement } from 'react';
import { Container, Nav, Navbar } from '@nilfoundation/react-components';
import { MobileMenu } from '../MobileMenu';
import { navigationLinks } from '../../../constants';
import { Breadcrumbs } from '../BreadCrumbs';
import './Header.scss';

/**
 * Header.
 *
 * @returns React component.
 */
export const Header = (): ReactElement => (
    <Navbar className="headerContainer">
        <Container>
            <Breadcrumbs />
            <Nav className="navbar-right navbar-nav">
                {navigationLinks.map(({ title, link }) => (
                    <Nav.Item
                        key={title}
                        href={link}
                    >
                        {title}
                    </Nav.Item>
                ))}
            </Nav>
            <MobileMenu className="pull-right" />
        </Container>
    </Navbar>
);
