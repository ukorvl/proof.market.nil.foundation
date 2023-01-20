/**
 * @file Redux saga.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

import { call, put, select, takeLatest } from 'redux-saga/effects';
import { SagaIterator } from '@redux-saga/core';
import { getProofs } from 'src/api';
import { Proof } from 'src/models';
import {
    UpdateProofList,
    UpdateIsLoadingProofs,
    UpdateProofsError,
    UpdateSelectedProofId,
} from '../actions';
import { RootStateType } from '../../RootStateType';
import { ProtectedCall, UpdateUserName } from '../../login';
import { selectSelectedProofId } from '../selectors';

const selectUser = (s: RootStateType) => s.userState.name;

/**
 * Proof main saga.
 *
 * @yields
 */
export function* ProofSaga(): SagaIterator<void> {
    yield takeLatest(UpdateUserName, GetProofSaga);
    yield takeLatest(UpdateProofList, SelectProofSaga);
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
        yield put(UpdateProofsError(false));
        yield put(UpdateIsLoadingProofs(true));

        const proofList: Proof[] = yield call(ProtectedCall, getProofs, user);

        if (proofList !== undefined) {
            yield put(UpdateProofList(proofList));
        }
    } catch (e) {
        yield put(UpdateProofsError(true));
    } finally {
        yield put(UpdateIsLoadingProofs(false));
    }
}

/**
 * Selects first circuit in list after circuits list update (if none is selected).
 *
 * @param {ReturnType<typeof UpdateProofList>} action - Action.
 * @yields
 */
function* SelectProofSaga({ payload }: ReturnType<typeof UpdateProofList>): SagaIterator<void> {
    const currentProofId = yield select(selectSelectedProofId);

    if (currentProofId) {
        return;
    }

    if (!payload.length) {
        return;
    }

    yield put(UpdateSelectedProofId(payload[0]._key));
}
