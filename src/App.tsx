/**
 * @file App.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

import { ReactElement, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout, NotificationProvider, Spinner } from '@nilfoundation/react-components';
import * as Sentry from '@sentry/react';
import {
    Header,
    Footer,
    ProtectedRoute,
    NetConnectionHandler,
    ReadonlyAccessProvider,
    AuthContainer,
} from './components';
import { routes, loginRoute, registerRoute } from './routing';
import ErrorView from './views/ErrorView';

/**
 * @returns App.
 */
function App(): ReactElement {
    return (
        <Sentry.ErrorBoundary fallback={<ErrorView />}>
            <NotificationProvider>
                <BrowserRouter>
                    <Layout
                        header={<Header />}
                        footer={<Footer />}
                        stickyHeader
                    >
                        {/* <Suspense fallback={<Spinner grow />}> */}
                        <NetConnectionHandler>
                            <Routes>
                                <Route
                                    path={registerRoute.path}
                                    element={
                                        <AuthContainer>
                                            <registerRoute.Component />
                                        </AuthContainer>
                                    }
                                />
                                <Route
                                    path={loginRoute.path}
                                    element={
                                        <AuthContainer>
                                            <loginRoute.Component />
                                        </AuthContainer>
                                    }
                                />
                                {routes.map(({ path, Component }) => (
                                    <Route
                                        key={path}
                                        path={path}
                                        element={
                                            <ReadonlyAccessProvider fallback={<Spinner grow />}>
                                                <ProtectedRoute>
                                                    <Component />
                                                </ProtectedRoute>
                                            </ReadonlyAccessProvider>
                                        }
                                    />
                                ))}
                            </Routes>
                        </NetConnectionHandler>
                        {/* </Suspense> */}
                    </Layout>
                </BrowserRouter>
            </NotificationProvider>
        </Sentry.ErrorBoundary>
    );
}

export default Sentry.withProfiler(App);
