/**
 * @file React functional component.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

import { ReactElement, ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { Path } from '../../../routing';
import { useAuth } from '../../../hooks';

/**
 * Props.
 */
type ProtectedRouteProps = {
    children: ReactNode;
};

/**
 * Component to restrict non-authorized users access.
 *
 * @param {ProtectedRouteProps} props - Props.
 * @returns React component.
 */
export const ProtectedRoute = ({ children }: ProtectedRouteProps): ReactElement => {
    const { isAuthentificated } = useAuth();

    return (
        <>
            {isAuthentificated ? (
                children
            ) : (
                <Navigate
                    replace
                    to={Path.login}
                />
            )}
        </>
    );
};
