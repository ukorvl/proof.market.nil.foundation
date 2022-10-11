/**
 * @file React functional component.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

import { ReactElement, ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Path } from '../../../routing';
import { RootStateType, UpdateUser } from '../../../redux';
import { useGetUserFromJwt, useCheckJwt } from '../../../hooks';
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
    const dispatch = useDispatch();
    const user = useSelector((s: RootStateType) => s.userState.user);
    const { getUser } = useGetUserFromJwt();
    // useCheckJwt();

    const isAuthentificated = () => {
        if (user) {
            return true;
        }

        const token = getItemFromLocalStorage<string>('jwt');
        const userFromToken = token ? getUser(token) : null;

        if (!!userFromToken) {
            dispatch(UpdateUser(userFromToken));
            return true;
        }

        return false;
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
