/**
 * @file Redux saga.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

import { SagaIterator } from 'redux-saga';
import { delay, call, take, fork, cancel, select } from 'redux-saga/effects';
import { PageIsHidden, PageIsVisible, selectUserName, UpdateUserName } from '../../login';

/**
 * Helps to revalidate data on interval. Revalidation starts when auth completes.
 * Stops data revalidation when user logs out or leaves the page.
 *
 * @param fnToRevalidate - Function to revalidate data. Can be Generator or common function.
 * @param revalidateInterval - Interval between calling fn.
 * @param args - Any arguments to pass into fn.
 * @returns Revalidation saga.
 * @yields
 */
export function* RevalidateSaga<T extends (...args: unknown[]) => unknown>(
    fnToRevalidate: T,
    revalidateInterval: number,
    ...args: Parameters<T>
): SagaIterator {
    while (true) {
        yield take([UpdateUserName, PageIsVisible]);
        const user = select(selectUserName);

        if (user) {
            yield call(Revalidate, fnToRevalidate, revalidateInterval, ...args);
        }
    }
}

// eslint-disable-next-line jsdoc/require-jsdoc
export function* Revalidate<T extends (...args: unknown[]) => unknown>(
    fnToRevalidate: T,
    revalidateInterval: number,
    ...args: Parameters<T>
): SagaIterator {
    const task = yield fork(function* () {
        while (true) {
            yield call(fnToRevalidate, ...args);
            yield delay(revalidateInterval);
        }
    });

    const { payload, type } = yield take([UpdateUserName, PageIsHidden]);

    if (type === PageIsHidden.type || !payload) {
        yield cancel(task);
    }
}
