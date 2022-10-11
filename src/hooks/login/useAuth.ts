/**
 * @file React hook.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

import { useCallback, useMemo } from 'react';
import { notificationActions, Variant } from '@nilfoundation/react-components';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { removeItemFromLocalStorage, setItemIntoLocalStorage } from '../../packages/LocalStorage';
import { RootStateType, UpdateUser } from '../../redux';
import { Path } from '../../routing';
import { getUserFromJwt } from '../../utils';

/**
 * Hook return type.
 */
type UseAuthReturnType = {
    user: string | null;
    isAuthentificated: boolean;
    processLogin: (jwt: string) => void;
    processLogout: () => void;
};

/**
 * Provides access to all auth features.
 *
 * @returns Auth hook return type.
 */
export const useAuth = (): UseAuthReturnType => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const user = useSelector((s: RootStateType) => s.userState.user);
    const isAuthentificated = useMemo(() => {
        return !!user;
    }, [user]);

    /**
     * Login.
     */
    const processLogin = useCallback(
        (jwt: string) => {
            setItemIntoLocalStorage('jwt', jwt);

            const user = getUserFromJwt(jwt);
            user && dispatch(UpdateUser(user));

            navigate(Path.root, { replace: true });

            notificationActions?.create({
                title: `Successfully login as ${user}`,
                variant: Variant.success,
            });
        },
        [dispatch, navigate],
    );

    /**
     * Logout.
     */
    const processLogout = useCallback(() => {
        dispatch(UpdateUser(null));
        removeItemFromLocalStorage('jwt');
    }, [dispatch]);

    return {
        user,
        isAuthentificated,
        processLogin,
        processLogout,
    };
};
