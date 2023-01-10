/**
 * @file Utility function.
 * @copyright Yury Korotovskikh <u.korotovskiy@nil.foundation>
 */

import dayjs from 'dayjs';
import { getExpiredAtFromJwt } from './jwtHelpers';

const renewExpiraitionDifference = 1 * 60;

/**
 * Returns revalidate jwt timeout in milliseconds.
 *
 * @param jwt Jwt.
 * @throws If token is invalid.
 * @returns Milliseconds.
 */
export const calculateRevalidateJwtTimeout = (jwt: string): number => {
    const expiredAt = getExpiredAtFromJwt(jwt);

    return (expiredAt - dayjs().unix()) * (1000 - renewExpiraitionDifference);
};
