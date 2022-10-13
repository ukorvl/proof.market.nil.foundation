/**
 * @file Redux saga.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

import { call, put, select, takeLatest } from 'redux-saga/effects';
import { SagaIterator } from '@redux-saga/core';
import { getProofs } from 'src/api';
import { Proof } from 'src/models';
import { UpdateProofList, UpdateIsLoadingProofs } from '../actions';
import { RootStateType } from '../../RootStateType';
import { UpdateUser } from '../../login';

const selectUser = (s: RootStateType) => s.userState.user;

/**
 * Proof main saga.
 *
 * @yields
 */
export function* ProofSaga(): SagaIterator<void> {
    yield takeLatest(UpdateUser, GetProofSaga);
}

/**
 * Get proof saga.
 *
 * @yields
 */
function* GetProofSaga(): SagaIterator<void> {
    const user: ReturnType<typeof selectUser> = yield select(selectUser);

    if (!user) {
        return;
    }

    try {
        yield put(UpdateIsLoadingProofs(true));
        const proofList: Proof[] = yield call(getProofs);

        if (proofList !== undefined) {
            yield put(UpdateProofList(proofList));
        }

        yield put(UpdateIsLoadingProofs(false));
    } catch (e) {
        yield put(UpdateIsLoadingProofs(false));
    }
}
