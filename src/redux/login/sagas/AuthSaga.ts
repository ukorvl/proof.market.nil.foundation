/**
 * @file Redux saga.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

import { SagaIterator } from '@redux-saga/core';
import { all, fork, put } from 'redux-saga/effects';
import { getItemFromLocalStorage } from '../../../packages/LocalStorage';
import { getUserFromJwt } from '../../../utils';
import { UpdateUser } from '../actions';

/**
 * Auth main saga.
 *
 * @yields
 */
export function* AuthSaga(): SagaIterator<void> {
    yield all([fork(TryGetUserFromLocalStorageToken)]);
}

/**
 * Tries to get user from localStorage token.
 *
 * @yields
 */
function* TryGetUserFromLocalStorageToken(): SagaIterator<void> {
    const jwt = getItemFromLocalStorage<string>('jwt');

    if (!jwt) {
        return;
    }

    const user = getUserFromJwt(jwt);

    if (user) {
        yield put(UpdateUser(user));
    }
}
