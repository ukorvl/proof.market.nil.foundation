/**
 * @file Root reducer.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

import { combineReducers } from 'redux';
import {
    ProofSystemReducer,
    CurrencyReducer,
} from './dahsboard';
import { RootStateType } from './RootStateType';

/**
 * Root reducer.
 */
export const RootReducer = combineReducers<RootStateType>({
    proofSystemState: ProofSystemReducer,
    currencyState: CurrencyReducer
});

/**
 * Root state.
 */
export type RootState = ReturnType<typeof RootReducer>;
