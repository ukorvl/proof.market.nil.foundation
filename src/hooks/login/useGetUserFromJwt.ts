/**
 * @file React hook.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

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

        if (!jwtParts[1]) {
            throw 'invalid token!';
        }

        if (!window.atob) {
            throw new Error('base64 support missing in browser');
        }

        const payload = JSON.parse(atob(jwtParts[1]));

        return payload.preferred_username ?? null;
    };

    return { getUser };
};
