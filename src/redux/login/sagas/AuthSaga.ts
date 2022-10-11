/**
 * @file Redux saga.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

import { SagaIterator } from '@redux-saga/core';

/**
 * Auth main saga.
 */
export function* AuthSaga(): SagaIterator<void> {
    console.log('here');
}
