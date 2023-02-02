/**
 * @file React component.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

import type { ReactElement } from 'react';
import { Helmet } from 'react-helmet-async';
import { LoginForm } from '../components';

/**
 * Login view.
 *
 * @returns React component.
 */
const LoginView = (): ReactElement => (
    <>
        <Helmet>
            <title>Login</title>
        </Helmet>
        <LoginForm />
    </>
);

export default LoginView;
