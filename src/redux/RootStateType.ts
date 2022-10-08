/**
 * @file Type declaration.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

import {
    CircuitsReducerState
} from './market';

/**
 * Root state type.
 */
export interface RootStateType {
    circuitsState: CircuitsReducerState;
}
