/**
 * @file Utility function.
 * @copyright Yury Korotovskikh <u.korotovskiy@nil.foundation>
 */

import { now } from '../dates';
import { getExpiredAtFromJwt } from './jwtHelpers';

/**
 * Returns revalidate jwt timeout in milliseconds.
 *
 * @param jwt Jwt.
 * @throws If token is invalid.
 * @returns Milliseconds.
 */
export const getRevalidateJwtTimeout = (jwt: string): number => {
    const expiredAt = getExpiredAtFromJwt(jwt);

    return (expiredAt - now()) * 940; // One minute before token expires
};
