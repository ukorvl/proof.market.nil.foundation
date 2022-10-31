/**
 * @file Type declaration.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

import { UserReducerState } from './login';
import { CircuitsReducerState, BidsReducerState, AsksReducerState } from './market';
import { ProofReducerState } from './portfolio';

/**
 * Root state type.
 */
export interface RootStateType {
    circuitsState: CircuitsReducerState;
    asksState: AsksReducerState;
    bidsState: BidsReducerState;
    proofState: ProofReducerState;
    userState: UserReducerState;
}
