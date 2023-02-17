/**
 * @file Root reducer.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

import { combineReducers } from 'redux';
import { RouterReducer } from './common';
import { UserReducer } from './login';
import { CircuitsReducer, OrderBookReducer, ChartsReducer, UserOrdersReducer } from './market';
import { ProofReducer } from './portfolio';
import type { RootStateType } from './RootStateType';

/**
 * Root reducer.
 */
export const RootReducer = combineReducers<RootStateType>({
    circuitsState: CircuitsReducer,
    proofState: ProofReducer,
    userState: UserReducer,
    routerState: RouterReducer,
    orderBookState: OrderBookReducer,
    chartsState: ChartsReducer,
    userOrdersState: UserOrdersReducer,
});
