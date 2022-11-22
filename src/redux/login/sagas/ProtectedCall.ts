/**
 * @file Redux saga.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

import { call, put, StrictEffect } from 'redux-saga/effects';
import { UpdateUser } from '../actions';

/**
 * Removes current user if api call response returns 401 error.
 * Consider to wrap all significant api calls into this.
 *
 * @param fn Api call.
 * @param args - Api call arguments.
 * @returns Api call result or throws error.
 * @throws Api call error.
 * @yields
 * @example
 * ```ts
 * const result = yield call(ProtectedCall, callMethod, callArguments);
 * ```
 */
export function* ProtectedCall<T extends (...args: unknown[]) => unknown>(
    fn: T,
    ...args: Parameters<T>
): Generator<StrictEffect, unknown, unknown> {
    try {
        const result: unknown = yield call(fn, ...args);

        return result;
    } catch (e) {
        if (e.response.data.code === 401) {
            yield put(UpdateUser(null));
        }

        throw e;
    }
}
