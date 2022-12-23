/**
 * @file Enum declaration.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

/**
 * Paths.
 */
export enum Path {
    root = '/',
    any = '*',
    login = '/login',
    portfolio = '/portfolio',
    register = '/register',
}

/**
 * Returens true if auth is required to access the path.
 *
 * @param p Path.
 * @returns .
 */
export const isPathProtected = (p: Path): boolean => protectedPaths.includes(p);

/**
 * Protected paths, auth required to access.
 */
const protectedPaths = [Path.portfolio];
