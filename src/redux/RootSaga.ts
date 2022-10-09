/**
 * @file Root saga.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

import { all, AllEffect, fork, ForkEffect } from 'redux-saga/effects';
import { CircuitsSaga } from './market';

/**
 * RootSaga.
 *
 * @yields
 */
export default function* RootSaga(): Iterator<AllEffect<ForkEffect>> {
    yield all([fork(CircuitsSaga)]);
}
