/**
 * @file React functional component.
 * @copyright Yury Korotovskikh <u.korotovskiy@nil.foundation>
 */

import type { ReactElement } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { Path } from '@/features/routing';
import { useAuth } from '@/hooks';

/**
 * Props.
 */
type ProtectedRouteProps = {
    readonlyAccess?: boolean;
    redirectPath?: Path;
};

/**
 * Component to restrict non-authorized users access.
 *
 * @param {ProtectedRouteProps} props - Props.
 * @returns React component.
 */
const ProtectedRoute = ({
    readonlyAccess = false,
    redirectPath = Path.login,
}: ProtectedRouteProps): ReactElement => {
    const { isAuthorized, isReadonly } = useAuth();
    const { pathname } = useLocation();

    return (
        <>
            {isAuthorized && (readonlyAccess ? true : !isReadonly) ? (
                <Outlet />
            ) : (
                <Navigate
                    replace
                    to={redirectPath}
                    state={{ from: pathname }}
                />
            )}
        </>
    );
};

export default ProtectedRoute;
