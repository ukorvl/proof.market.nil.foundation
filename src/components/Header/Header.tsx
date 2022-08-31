import { ReactElement } from 'react';
import { Container } from '@nilfoundation/react-components';
import { Navbar, Logo } from '..';
import { MobileMenu } from '../MobileMenu';
import { NavList } from '../NavList';
import { navigationLinks } from '../../constants';

export const Header = (): ReactElement =>
    <Navbar>
        <Container>
            <Logo />
            <NavList className="navbar-right">
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
