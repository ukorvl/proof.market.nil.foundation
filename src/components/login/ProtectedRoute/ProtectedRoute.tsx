/**
 * @file React functional component.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

import { ReactElement, ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Path } from '../../../routing';
import { RootStateType } from '../../../redux';
import { useGetUserFromJwt } from '../../../hooks';
import { getItemFromLocalStorage } from '../../../packages/LocalStorage';

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
    const user = useSelector((s: RootStateType) => s.userState.user);
    const { getUser } = useGetUserFromJwt();
    const isAuthentificated = () => {
        const token = getItemFromLocalStorage<string>('jwt');
        return user ?? (token ? getUser(token) : false);
    };

    return (
        <>
            {isAuthentificated() ? (
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
