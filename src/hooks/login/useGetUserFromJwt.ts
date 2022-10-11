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
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const decoded: any = jwt_decode(jwt);

        if (!decoded || !decoded.preferred_username) {
            return null;
        }

        return decoded.preferred_username;
    };

    return { getUser };
};
