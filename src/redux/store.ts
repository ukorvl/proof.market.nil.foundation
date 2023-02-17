/**
 * @file State.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import type { Middleware } from '@reduxjs/toolkit';
import { RootReducer } from './rootReducer';
import RootSaga from './RootSaga';

const sagaMiddleware = createSagaMiddleware();
const middlewares: Middleware[] = [sagaMiddleware];

export const store = configureStore({
    reducer: RootReducer,
    middleware: getDefaultMiddleware => [...getDefaultMiddleware({ thunk: false }), ...middlewares],
    devTools: process.env.NODE_ENV !== 'production',
});

sagaMiddleware.run(RootSaga);
