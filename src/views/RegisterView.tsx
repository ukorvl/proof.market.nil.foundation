/**
 * @file React component.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

import { ReactElement } from 'react';
import { AuthContainer, RegisterForm } from 'src/components';

/**
 * Register user view.
 *
 * @returns React component.
 */
const RegisterView = (): ReactElement => (
    <AuthContainer>
        <RegisterForm />
    </AuthContainer>
);

export default RegisterView;
