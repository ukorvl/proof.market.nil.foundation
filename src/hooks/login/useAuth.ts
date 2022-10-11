/**
 * @file React hook.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

import { notificationActions, Variant } from '@nilfoundation/react-components';
import jwt_decode from 'jwt-decode';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setItemIntoLocalStorage } from '../../packages/LocalStorage';
import { UpdateUser } from '../../redux';
import { Path } from '../../routing';

type UseAuthReturnType = {
    processLogin: (jwt: string) => void;
};

/**
 * Provides access to all auth features.
 *
 * @returns Auth hook return type.
 */
export const useAuth = (): UseAuthReturnType => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const processLogin = (jwt: string) => {
        setItemIntoLocalStorage('jwt', jwt);

        const user = getUserFromJwt(jwt);
        user && dispatch(UpdateUser(user));

        navigate(Path.root, { replace: true });

        notificationActions?.create({
            title: `Successfully login as ${user}`,
            variant: Variant.success,
        });
    };

    return {
        processLogin,
    };
};

/**
 * Parse jwt to get username.
 *
 * @param jwt - Jwt.
 * @returns Username or null.
 */
const getUserFromJwt = (jwt: string) => {
    const jwtParts = jwt.split('.');

    if (!jwtParts[1]) {
        throw 'invalid token!';
    }

    const payload = JSON.parse(jwt_decode(jwtParts[1]));

    return payload.preferred_username ?? null;
};
