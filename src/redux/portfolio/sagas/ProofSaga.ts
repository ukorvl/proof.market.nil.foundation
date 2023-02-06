/**
 * @file Redux saga.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

import { call, put, select, takeEvery, takeLatest } from 'redux-saga/effects';
import type { SagaIterator } from '@redux-saga/core';
import { getProofs } from 'src/api';
import type { Proof } from 'src/models';
import { SetParams, selectUrlParamProofKey } from 'src/redux/common';
import { RouterParam } from 'src/enums';
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
    yield takeEvery(SetParams, SelectProofOnUrlParamChange);
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

    yield put(UpdateSelectedProofKey(urlParamKey ?? payload[0]._key));
}

/**
 * Selects proof if url proof key param changes.
 *
 * @param {ReturnType<typeof SetParams>} action - Action.
 * @yields
 */
function* SelectProofOnUrlParamChange({ payload: params }: ReturnType<typeof SetParams>) {
    const urlKeyParam = params[RouterParam.statementKey];
    const currentProofKey: string | undefined = yield select(selectSelectedProofKey);

    if (!urlKeyParam) {
        return;
    }

    if (currentProofKey === urlKeyParam) {
        return;
    }

    yield put(UpdateSelectedProofKey(urlKeyParam));
}
