/**
 * @file Redux saga.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

import { call, put, select, takeLatest } from 'redux-saga/effects';
import type { SagaIterator } from '@redux-saga/core';
import { getProofs } from 'src/api';
import type { Proof } from 'src/models';
import { selectUrlParamProofKey, selectNavigate, selectLocation } from 'src/redux/common';
import {
    UpdateProofList,
    UpdateIsLoadingProofs,
    UpdateProofsError,
    UpdateSelectedProofKey,
} from '../actions';
import { ProtectedCall, UpdateUserName } from '../../login';
import { selectSelectedProofKey } from '../selectors';
import type { RootStateType } from '../../RootStateType';

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
    const currentProofId = yield select(selectSelectedProofKey);

    if (currentProofId) {
        return;
    }

    if (!payload.length) {
        return;
    }

    const urlParamKey: string = yield select(selectUrlParamProofKey);
    const navigate = yield select(selectNavigate);
    const location = yield select(selectLocation);

    const keyToSelect = urlParamKey ?? payload[0]._key;

    yield put(UpdateSelectedProofKey(keyToSelect));
    !urlParamKey && navigate(`${location.pathname}/${keyToSelect}`);
}
