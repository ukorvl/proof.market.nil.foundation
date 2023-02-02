/**
 * @file Selectors.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

import type { RootStateType } from 'src/redux';

/**
 * Select current user name.
 *
 * @param s State.
 * @returns User name.
 */
export const selectUserName = (s: RootStateType): string | null => s.userState.name;

/**
 * Select current user balance.
 *
 * @param s State.
 * @returns User balance.
 */
export const selectUserBalance = (s: RootStateType): number | undefined | null =>
    s.userState.balance;
