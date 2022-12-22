/**
 * @file React component.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

import { ReactElement } from 'react';
import { Helmet } from 'react-helmet';
import { baseDocumentTitle } from 'src/constants';
import { LoginForm } from '../components';

/**
 * Login view.
 *
 * @returns React component.
 */
const LoginView = (): ReactElement => (
    <>
        <Helmet>
            <title>{`${baseDocumentTitle} | Login`}</title>
        </Helmet>
        <LoginForm />
    </>
);

export default LoginView;
