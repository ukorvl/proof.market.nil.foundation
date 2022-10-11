/**
 * @file State.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import logger from 'redux-logger';
import { RootReducer } from './rootReducer';
import RootSaga from './RootSaga';

const sagaMiddleware = createSagaMiddleware();
const middlewares = [sagaMiddleware, logger];

export const store = configureStore({
    reducer: RootReducer,
    middleware: getDefaultMiddleware => [...getDefaultMiddleware({ thunk: false }), ...middlewares],
    devTools: process.env.NODE_ENV !== 'production',
});

sagaMiddleware.run(RootSaga);
