/**
 * @file React hook.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

import jwt_decode from 'jwt-decode';

/**
 * Return type.
 */
type GetUserFromJwtReturnType = {
    getUser: (jwt: string) => string;
};

/**
 * Returns function to get user from jwt token.
 *
 * @returns Get user method.
 */
export const useGetUserFromJwt = (): GetUserFromJwtReturnType => {
    const getUser = (jwt: string) => {
        const jwtParts = jwt.split('.');

        const t = jwt_decode(jwt);
        console.log(t);

        if (!jwtParts[1]) {
            throw 'invalid token!';
        }

        const payload = JSON.parse(jwt_decode(jwtParts[1]));

        return payload.preferred_username ?? null;
    };

    return { getUser };
};
