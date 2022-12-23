/**
 * @file React functional component.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

import { ReactElement, ReactNode, useCallback } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { Path } from 'src/routing';
import { useAuth } from 'src/hooks';
import { UrlQueryParam } from 'src/enums';

/**
 * Props.
 */
type ProtectedRouteProps = {
    children: ReactNode;
    readonlyAccess?: boolean;
};

/**
 * Component to restrict non-authorized users access.
 *
 * @param {ProtectedRouteProps} props - Props.
 * @returns React component.
 */
export const ProtectedRoute = ({
    children,
    readonlyAccess = false,
}: ProtectedRouteProps): ReactElement => {
    const { isAuthentificated, isReadonly } = useAuth();
    const { pathname } = useLocation();

    const getNavigateTo = useCallback(
        () => (isReadonly ? `${Path.login}/?${UrlQueryParam.ref}=${pathname}` : Path.login),
        [isReadonly, readonlyAccess, pathname],
    );

    return (
        <>
            {isAuthentificated ? (
                children
            ) : (
                <Navigate
                    replace
                    to={getNavigateTo()}
                />
            )}
        </>
    );
};
