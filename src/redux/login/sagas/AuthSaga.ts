/**
 * @file Redux saga.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

import { SagaIterator } from '@redux-saga/core';
import { fork, put } from 'redux-saga/effects';
import { getItemFromLocalStorage } from 'src/packages/LocalStorage';
import { getUserFromJwt } from 'src/utils';
import { UpdateUserName } from '../actions';

/**
 * Auth main saga.
 *
 * @yields
 */
export function* AuthSaga(): SagaIterator<void> {
    yield fork(TryGetUserFromLocalStorageTokenSaga);
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
    }
}
