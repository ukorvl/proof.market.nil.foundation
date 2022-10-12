/**
 * @file Root reducer.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

import { combineReducers } from 'redux';
import { UserReducer } from './login';
import { CircuitsReducer, ProposalsReducer, OrdersReducer } from './market';
import { RootStateType } from './RootStateType';

/**
 * Root reducer.
 */
export const RootReducer = combineReducers<RootStateType>({
    circuitsState: CircuitsReducer,
    proposalsState: ProposalsReducer,
    ordersState: OrdersReducer,
    userState: UserReducer,
});
