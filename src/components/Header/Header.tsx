import { ReactElement } from 'react';
import { Container, Nav, Navbar } from '@nilfoundation/react-components';
import { MobileMenu } from '../MobileMenu';
import { navigationLinks } from '../../constants';
import './Header.scss';

export const Header = (): ReactElement => (
    <Navbar>
        <Container>
            <a
                rel="noreferrer"
                target="_blank"
                href="https://nil.foundation"
            >
                <ol className="navbar-brand breadcrumb">
                    <li>
                        <code>=nil;</code>
                        Foundation
                    </li>
                </ol>
            </a>
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
