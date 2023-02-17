/**
 * @file Selectors.
 * @copyright Yury Korotovskikh <u.korotovskiy@nil.foundation>
 */

import type { Ask } from 'src/models';
import type { RootStateType } from 'src/redux';

/**
 * Select charts data.
 *
 * @param s State.
 * @returns Chart data.
 */
export const selectChartData = (s: RootStateType): Ask[] => s.chartsState.data;
