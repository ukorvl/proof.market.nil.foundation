/**
 * @file Type declaration.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

import { UserReducerState } from './login';
import {
    CircuitsReducerState,
    BidsReducerState,
    ProofReducerState,
    AsksReducerState,
} from './market';

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
