/**
 * @file React functional component.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

import { ReactElement, useCallback } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { Path } from 'src/routing';
import { useAuth } from 'src/hooks';
import { UrlQueryParam } from 'src/enums';

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
    const { isAuthentificated, isReadonly } = useAuth();
    const { pathname } = useLocation();

    const getNavigateTo = useCallback(
        () => `${redirectPath}/?${UrlQueryParam.ref}=${pathname}`,
        [pathname, redirectPath],
    );

    return (
        <>
            {isAuthentificated && (readonlyAccess ? true : !isReadonly) ? (
                <Outlet />
            ) : (
                <Navigate
                    replace
                    to={getNavigateTo()}
                />
            )}
        </>
    );
};

export default ProtectedRoute;
