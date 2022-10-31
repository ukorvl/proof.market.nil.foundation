/**
 * @file Root reducer.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

import { combineReducers } from 'redux';
import { UserReducer } from './login';
import { CircuitsReducer, BidsReducer, AsksReducer } from './market';
import { ProofReducer } from './portfolio';
import { RootStateType } from './RootStateType';

/**
 * Root reducer.
 */
export const RootReducer = combineReducers<RootStateType>({
    circuitsState: CircuitsReducer,
    asksState: AsksReducer,
    bidsState: BidsReducer,
    proofState: ProofReducer,
    userState: UserReducer,
});
