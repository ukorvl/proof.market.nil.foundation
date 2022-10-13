/**
 * @file Redux saga.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

import { SagaIterator } from '@redux-saga/core';
import { all, call, fork, put } from 'redux-saga/effects';
import { chekJwt } from 'src/api';
import { getItemFromLocalStorage } from '../../../packages/LocalStorage';
import { getUserFromJwt } from '../../../utils';
import { UpdateUser } from '../actions';

/**
 * Auth main saga.
 *
 * @yields
 */
export function* AuthSaga(): SagaIterator<void> {
    yield all([fork(TryGetUserFromLocalStorageTokenSaga), fork(CheckJwtExpiredSaga)]);
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
        yield put(UpdateUser(user));
    }
}

function* CheckJwtExpiredSaga(): SagaIterator<void> {
    try {
        yield call(chekJwt);
    } catch (e) {
        if (e.response.data.code === 401) {
            yield put(UpdateUser(null));
        }
    }
}
