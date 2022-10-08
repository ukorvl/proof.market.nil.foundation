/**
 * @file React hook.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

/**
 * Returns function to get user from jwt token.
 *
 * @returns Get user method.
 */
export const useGetUserFromJwt = () => {
    const getUser = (jwt: string) => {
        const jwtParts = jwt.split('.');

        if (!jwtParts[1]) {
            throw 'invalid token!';
        }

        const payload = JSON.parse(atob(jwtParts[1]));

        return payload.preferred_username ?? null;
    };

    return { getUser };
};
