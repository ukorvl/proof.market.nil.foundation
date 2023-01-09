/**
 * @file React hook.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

import { useCallback, useMemo } from 'react';
import { notificationActions, Variant } from '@nilfoundation/react-components';
import { useDispatch } from 'react-redux';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { removeItemFromLocalStorage, setItemIntoLocalStorage } from 'src/packages/LocalStorage';
import { selectUserName, SetJwtRevalidateTimeout, UpdateUserName, useAppSelector } from 'src/redux';
import { Path } from 'src/routing';
import { calculateRevalidateJwtTimeout, getUserFromJwt } from 'src/utils';
import { UrlQueryParam } from 'src/enums';

const readonlyUser = process.env.REACT_APP_READONLY_USER;

/**
 * Provides access to auth state.
 *
 * @returns Auth state.
 */
export const useAuth = (): {
    user: string | null;
    isAuthentificated: boolean;
    isReadonly: boolean;
} => {
    const user = useAppSelector(selectUserName);
    const isAuthentificated = useMemo(() => {
        return !!user;
    }, [user]);
    const isReadonly = useMemo(() => {
        return user === readonlyUser;
    }, [user]);

    return {
        user,
        isAuthentificated,
        isReadonly,
    };
};

/**
 * Returns callback to process login with jwt token.
 *
 * @returns Login callback.
 */
export const useLogin = (): ((jwt: string) => void) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const refUrlParam = searchParams.get(UrlQueryParam.ref);

    const processLogin = useCallback(
        (jwt: string) => {
            setItemIntoLocalStorage('jwt', jwt);

            const user = getUserFromJwt(jwt);
            const timeout = calculateRevalidateJwtTimeout(jwt);

            user && dispatch(UpdateUserName(user));
            dispatch(SetJwtRevalidateTimeout(timeout));

            const navigateTo = refUrlParam || Path.root;
            navigate(navigateTo, { replace: true });

            if (user === readonlyUser) {
                return;
            }

            notificationActions?.create({
                title: 'Login success',
                message: `Successfully login as ${user}`,
                variant: Variant.success,
            });
        },
        [dispatch, navigate, refUrlParam],
    );

    return processLogin;
};

/**
 * Returns callback to logout with existed user.
 *
 * @returns Logout callback.
 */
export const useLogout = (): (() => void) => {
    const dispatch = useDispatch();

    const processLogout = useCallback(() => {
        dispatch(UpdateUserName(null));
        removeItemFromLocalStorage('jwt');
    }, [dispatch]);

    return processLogout;
};
