/**
 * @file Type declaration.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

import {
    ProofSystemReducerState,
    CurrencyReducerState
} from './dahsboard';

/**
 * Root state type.
 */
export interface RootStateType {
    proofSystemState: ProofSystemReducerState;
    currencyState: CurrencyReducerState;
}
