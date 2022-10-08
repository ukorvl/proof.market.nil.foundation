/**
 * @file Root reducer.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

import { combineReducers } from 'redux';
import { UserReducer } from './login/reducers';
import { CircuitsReducer } from './market';
import { RootStateType } from './RootStateType';

/**
 * Root reducer.
 */
export const RootReducer = combineReducers<RootStateType>({
    circuitsState: CircuitsReducer,
    userState: UserReducer,
});

/**
 * Root state.
 */
export type RootState = ReturnType<typeof RootReducer>;
