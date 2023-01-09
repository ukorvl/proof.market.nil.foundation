/**
 * @file Redux saga.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

import { SagaIterator } from '@redux-saga/core';
import { call, put, takeLatest } from 'redux-saga/effects';
import { getUserBalance } from 'src/api';
import { UserBalance } from 'src/models';
import {
    UpdateUserBalance,
    UpdateUserBalanceIsLoading,
    UpdateUserBalanceIsLoadingError,
    UpdateUserName,
} from '../actions';
import { ProtectedCall } from './ProtectedCall';
import { AddAsk, AddBid } from '../../market';

/**
 * User main saga.
 *
 * @yields
 */
export function* UserSaga(): SagaIterator<void> {
    yield takeLatest([UpdateUserName, AddAsk, AddBid], GetUserInfoSaga);
}

/**
 * Gets user info after updating user.
 *
 * @param {ReturnType<typeof UpdateUserName>} action Action return type.
 * @yields
 */
function* GetUserInfoSaga({
    payload: user,
}: ReturnType<typeof UpdateUserName>): SagaIterator<void> {
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
