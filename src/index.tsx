/**
 * @file Index.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import App from './App';
import { store } from './redux';
import './index.scss';

render(
    <React.StrictMode>
        <Provider store={store}>
            <App />
        </Provider>
    </React.StrictMode>,
    document.getElementById('root'),
);
