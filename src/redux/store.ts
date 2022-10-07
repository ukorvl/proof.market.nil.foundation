/**
 * @file State.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import { RootReducer } from './RootReducer';

export const store = configureStore({
    reducer: RootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
    devTools: process.env.NODE_ENV !== 'production',
});
