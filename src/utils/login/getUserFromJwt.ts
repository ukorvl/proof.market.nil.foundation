/**
 * @file Utility function.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

import jwt_decode from 'jwt-decode';

/**
 * Parse jwt to get username.
 *
 * @param jwt - Jwt.
 * @throws Will throw an error if can't get user from token.
 * @returns Username or null.
 */
export const getUserFromJwt = (jwt: string): string => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const decoded: any = jwt_decode(jwt);

    if (!decoded || !decoded.preferred_username) {
        throw new Error('Invalid token!');
    }

    return decoded.preferred_username as string;
};
