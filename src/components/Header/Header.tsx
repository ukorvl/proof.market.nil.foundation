import { ReactElement } from 'react';
import { Container, NavList, Navbar } from '@nilfoundation/react-components';
import { Logo } from '..';
import { MobileMenu } from '../MobileMenu';
import { navigationLinks } from '../../constants';
import './Header.scss';

export const Header = (): ReactElement =>
    <Navbar>
        <Container>
            <Logo />
            <NavList className="navbar-right navbar-nav">
                {
                    navigationLinks.map(({title, link}) =>
                        <NavList.Link
                            key={title}
                            href={link}
                        >
                            {title}
                        </NavList.Link>)
                }
            </NavList>
            <MobileMenu className="pull-right" />
        </Container>
    </Navbar>;
