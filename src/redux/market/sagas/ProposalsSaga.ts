/**
 * @file Redux saga.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

import { call, put, takeLatest } from 'redux-saga/effects';
import { SagaIterator } from '@redux-saga/core';
import { getProposals } from 'src/api';
import { Proposal } from 'src/models';
import { UpdateCircuitsList, UpdateProposalsList } from '../actions';

/**
 * Proposals main saga.
 *
 * @yields
 */
export function* ProposalsSaga(): SagaIterator<void> {
    yield takeLatest(UpdateCircuitsList, GetProposalsSaga);
}

/**
 * Get proposals saga.
 *
 * @yields
 */
function* GetProposalsSaga(): SagaIterator<void> {
    try {
        const proposals: Proposal[] = yield call(getProposals);

        if (proposals !== undefined) {
            yield put(UpdateProposalsList(proposals));
        }
    } catch (e) {}
}
