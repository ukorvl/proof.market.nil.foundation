/**
 * @file Reducer.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

import { createReducer } from '@reduxjs/toolkit';
import { Currency } from '../../../enums';
import { UpdateCurrency } from '../actions';

/**
 * State.
 */
export type CurrencyReducerState = {
    currency?: Currency;
};

/**
 * Initial state.
 */
const initialState: CurrencyReducerState = {
    currency: undefined
};

/**
 * Reducer of selected currency.
 */
export const CurrencyReducer = createReducer(initialState, builder =>
    builder
        .addCase(UpdateCurrency, (_, { payload }) => ({
            currency: payload
        }))
);
