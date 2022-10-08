/**
 * @file React component.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

import { ReactElement, ReactNode } from 'react';
import { Container } from '@nilfoundation/react-components';
import './LoginContainer.scss';

type LoginContainerProps = {
    children: ReactNode;
}

/**
 * Login container.
 *
 * @param {LoginContainerProps} props Props.
 * @returns React component.
 */
export const LoginContainer = ({children}: LoginContainerProps): ReactElement => {
    return (
        <Container as="main" fluid className="loginContainer">
            {children}
        </Container>
    );
};
