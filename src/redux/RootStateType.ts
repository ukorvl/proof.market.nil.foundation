/**
 * @file Type declaration.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

import { UserReducerState } from './login';
import {
    CircuitsReducerState,
    OrdersReducerState,
    ProofReducerState,
    ProposalsReducerState,
} from './market';

/**
 * Root state type.
 */
export interface RootStateType {
    circuitsState: CircuitsReducerState;
    proposalsState: ProposalsReducerState;
    ordersState: OrdersReducerState;
    proofState: ProofReducerState;
    userState: UserReducerState;
}
