/**
 * @file React component.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

import { ReactElement } from 'react';
import { Helmet } from 'react-helmet';
import { baseDocumentTitle } from 'src/constants';
import { RegisterForm } from 'src/components';

/**
 * Register user view.
 *
 * @returns React component.
 */
const RegisterView = (): ReactElement => (
    <>
        <Helmet>
            <title>{`${baseDocumentTitle} | Register`}</title>
        </Helmet>
        <RegisterForm />
    </>
);

export default RegisterView;
