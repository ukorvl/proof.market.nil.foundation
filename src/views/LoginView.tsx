/**
 * @file React component.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

import { ReactElement } from 'react';
import { LoginContainer, LoginForm } from '../components';

/**
 * Login view.
 *
 * @returns React component.
 */
const LoginView = (): ReactElement => (
    <LoginContainer>
        <LoginForm />
    </LoginContainer>
);

export default LoginView;
