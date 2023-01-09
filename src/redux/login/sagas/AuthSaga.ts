/**
 * @file Redux saga.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

import { SagaIterator } from '@redux-saga/core';
import { call, delay, fork, put, select, takeLatest } from 'redux-saga/effects';
import { renewJwt } from 'src/api';
import { getItemFromLocalStorage, setItemIntoLocalStorage } from 'src/packages/LocalStorage';
import { calculateRevalidateJwtTimeout, getUserFromJwt } from 'src/utils';
import { SetJwtRevalidateTimeout, UpdateUserName } from '../actions';
import { selectUserName } from '../selectors';

/**
 * Auth main saga.
 *
 * @yields
 */
export function* AuthSaga(): SagaIterator<void> {
    yield fork(TryGetUserFromLocalStorageTokenSaga);
    yield takeLatest(SetJwtRevalidateTimeout, RenewJwtSaga);
}

/**
 * Tries to get user from localStorage token.
 *
 * @yields
 */
function* TryGetUserFromLocalStorageTokenSaga(): SagaIterator<void> {
    const jwt = getItemFromLocalStorage<string>('jwt');

    if (!jwt) {
        return;
    }

    const user = getUserFromJwt(jwt);

    if (user) {
        yield put(UpdateUserName(user));

        const timeout = calculateRevalidateJwtTimeout(jwt);
        yield put(SetJwtRevalidateTimeout(timeout));
    }
}

/**
 * Renews jwt token to prevent auto-logout from dbms instance.
 *
 * @param {ReturnType<typeof SetJwtRevalidateTimeout>} params .
 * @yields
 */
function* RenewJwtSaga({
    payload: timeout,
}: ReturnType<typeof SetJwtRevalidateTimeout>): SagaIterator<void> {
    while (true) {
        yield delay(timeout);
        yield call(processRenewJwt);
    }
}

/**
 * Renew jwt process.
 *
 * @yields
 */
function* processRenewJwt(): SagaIterator<void> {
    try {
        const currentUser = yield select(selectUserName);

        const result: Awaited<ReturnType<typeof renewJwt>> = yield call(renewJwt, currentUser);

        if (!result.jwt) {
            return;
        }

        const user = getUserFromJwt(result.jwt);
        const timeout = calculateRevalidateJwtTimeout(result.jwt);

        if (user === currentUser) {
            setItemIntoLocalStorage('jwt', result.jwt);

            yield put(SetJwtRevalidateTimeout(timeout));
        }
    } catch (e) {
        throw e;
    }
}
