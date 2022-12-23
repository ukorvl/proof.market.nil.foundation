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
 * Returns true if auth is not required to access path.
 *
 * @param p Path.
 * @returns .
 */
export const isAllowPathReadonlyAccess = (p: Path): boolean => !protectedPaths.includes(p);

/**
 * Protected paths, auth required to access.
 */
const protectedPaths = [Path.portfolio];
