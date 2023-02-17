/**
 * @file Type declaration.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

import type { RouterReducerState } from './common';
import type { UserReducerState } from './login';
import type {
    CircuitsReducerState,
    OrderBookReducerState,
    ChartsReducerState,
    UserOrdersReducerState,
} from './market';
import type { ProofReducerState } from './portfolio';

/**
 * Root state type.
 */
export interface RootStateType {
    circuitsState: CircuitsReducerState;
    proofState: ProofReducerState;
    userState: UserReducerState;
    routerState: RouterReducerState;
    orderBookState: OrderBookReducerState;
    chartsState: ChartsReducerState;
    userOrdersState: UserOrdersReducerState;
}
