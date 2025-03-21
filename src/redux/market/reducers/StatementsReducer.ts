/**
 * @file Reducer.
 * @copyright Yury Korotovskikh <u.korotovskiy@nil.foundation>
 */

import { createReducer } from '@reduxjs/toolkit';
import type { Statement, StatementInfo, StatementStats } from '@/models';
import { getItemFromLocalStorage, setItemIntoLocalStorage } from '@/packages/LocalStorage';
import {
    UpdateStatementsList,
    UpdateSelectedStatementKey,
    UpdateIsLoadingStatements,
    UpdateStatementsError,
    UpdateStatementsInfoList,
    UpdateIsLoadingStatementsInfo,
    UpdateStatementsStats,
    UpdateIsLoadingStatementsStats,
    UpdateSelectedStatementTags,
} from '../actions';

/**
 * State.
 */
export type StatementsReducerState = {
    statements: Statement[];
    selectedKey?: string;
    isLoading: boolean;
    error?: boolean;
    statementsInfo: StatementInfo[];
    isLoadingStatementsInfo: boolean;
    statementsStats: StatementStats[];
    isLoadingStatementsStats: boolean;
    selectedStatementTags: string[];
};

/**
 * Initial state.
 */
const initialState: StatementsReducerState = {
    statements: [],
    selectedKey: undefined,
    isLoading: false,
    error: false,
    statementsInfo: [],
    isLoadingStatementsInfo: false,
    statementsStats: [],
    isLoadingStatementsStats: false,
    selectedStatementTags: getItemFromLocalStorage('selectedStatementsTags') ?? [],
};

/**
 * Reducer of statements.
 */
export const StatementsReducer = createReducer(initialState, builder =>
    builder
        .addCase(UpdateStatementsList, (state, { payload }) => ({
            ...state,
            statements: payload,
        }))
        .addCase(UpdateSelectedStatementKey, (state, { payload }) => {
            if (state.statements.some(x => x._key === payload)) {
                state.selectedKey = payload;
            }
        })
        .addCase(UpdateIsLoadingStatements, (state, { payload }) => ({
            ...state,
            isLoading: payload,
        }))
        .addCase(UpdateStatementsError, (state, { payload }) => ({
            ...state,
            error: payload,
        }))
        .addCase(UpdateStatementsInfoList, (state, { payload }) => ({
            ...state,
            statementsInfo: payload,
        }))
        .addCase(UpdateIsLoadingStatementsInfo, (state, { payload }) => ({
            ...state,
            isLoadingStatementsInfo: payload,
        }))
        .addCase(UpdateStatementsStats, (state, { payload }) => ({
            ...state,
            statementsStats: payload,
        }))
        .addCase(UpdateIsLoadingStatementsStats, (state, { payload }) => ({
            ...state,
            isLoadingStatementsStats: payload,
        }))
        .addCase(UpdateSelectedStatementTags, (state, { payload }) => {
            state.selectedStatementTags = payload;

            setItemIntoLocalStorage('selectedStatementsTags', payload);
        }),
);
