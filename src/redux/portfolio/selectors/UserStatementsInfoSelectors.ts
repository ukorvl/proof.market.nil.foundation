/**
 * @file Selectors.
 * @copyright Yury Korotovskikh <u.korotovskiy@nil.foundation>
 */

import { createSelector } from '@reduxjs/toolkit';
import type { RootStateType } from '@/redux';

/**
 * Select current selected user statement info.
 */
export const selectSelectedUserStatementInfo = createSelector(
    (s: RootStateType) => s.userStatementInfoState.userStatementInfo,
    (s: RootStateType) => s.userStatementInfoState.selectedUserStatementInfoKey,
    (userStatementInfo, key) => userStatementInfo.find(s => s._key === key),
);
