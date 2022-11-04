/**
 * @file Selectors.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

import { RootStateType } from 'src/redux';

/**
 * Select current user.
 *
 * @param s State.
 * @returns User.
 */
export const selectCurrentUser = (s: RootStateType): string | null => s.userState.user;
