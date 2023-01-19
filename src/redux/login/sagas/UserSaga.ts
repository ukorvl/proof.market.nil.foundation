/**
 * @file Redux saga.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

import { SagaIterator } from '@redux-saga/core';
import { call, put, select, takeLatest } from 'redux-saga/effects';
import { getUserBalance } from 'src/api';
import { UserBalance } from 'src/models';
import {
    UpdateUserBalance,
    UpdateUserBalanceIsLoading,
    UpdateUserBalanceIsLoadingError,
    UpdateUserName,
} from '../actions';
import { ProtectedCall } from './ProtectedCall';
import { AddAsk, AddBid, RemoveAsk, RemoveBid } from '../../market';
import { selectUserName } from '../selectors';

/**
 * User main saga.
 *
 * @yields
 */
export function* UserSaga(): SagaIterator<void> {
    yield takeLatest([UpdateUserName, AddAsk, AddBid, RemoveAsk, RemoveBid], GetUserInfoSaga);
}

/**
 * Gets user info after updating user.
 *
 * @yields
 */
function* GetUserInfoSaga(): SagaIterator<void> {
    const user = yield select(selectUserName);
    const isReadonly = user === process.env.REACT_APP_READONLY_USER;
    if (isReadonly || !user) {
        return;
    }

    try {
        yield put(UpdateUserBalanceIsLoading(true));
        yield put(UpdateUserBalanceIsLoadingError(false));

        const balance: UserBalance | undefined = yield call(ProtectedCall, getUserBalance, user);
        yield put(UpdateUserBalance(balance));
    } catch {
        yield put(UpdateUserBalanceIsLoadingError(true));
    } finally {
        yield put(UpdateUserBalanceIsLoading(false));
    }
}
