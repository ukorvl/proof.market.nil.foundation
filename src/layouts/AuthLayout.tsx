/**
 * @file App.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

import { ReactElement } from 'react';
import { Outlet } from 'react-router-dom';
import { AuthContainer } from 'src/components';

/**
 * Auth layout.
 *
 * @returns React element.
 */
const AuthLayout = (): ReactElement => {
    return (
        <AuthContainer>
            <Outlet />
        </AuthContainer>
    );
};

export default AuthLayout;
