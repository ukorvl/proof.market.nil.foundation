/**
 * @file App.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

import { ReactElement, Suspense } from 'react';
import { NotificationProvider, Spinner } from '@nilfoundation/react-components';
import { ErrorBoundary, withProfiler } from '@sentry/react';
import { Helmet } from 'react-helmet-async';
import { NetConnectionHandler } from './components';
import { Router } from './routing';
import ErrorView from './views/ErrorView';

const baseDocumentTitle = process.env.REACT_APP_SITE_DEFAULT_TITLE;

/**
 * @returns App.
 */
function App(): ReactElement {
    return (
        <ErrorBoundary fallback={<ErrorView />}>
            <NotificationProvider>
                <Helmet
                    titleTemplate={`${baseDocumentTitle} | %s`}
                    defaultTitle={baseDocumentTitle}
                />
                <NetConnectionHandler>
                    <Suspense fallback={<Spinner grow />}>
                        <Router />
                    </Suspense>
                </NetConnectionHandler>
            </NotificationProvider>
        </ErrorBoundary>
    );
}

export default withProfiler(App);
