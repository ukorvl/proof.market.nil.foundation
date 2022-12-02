/**
 * @file App.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

import { ReactElement, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout, NotificationProvider, Spinner } from '@nilfoundation/react-components';
import * as Sentry from '@sentry/react';
import { Header, Footer, ProtectedRoute, NetConnectionHandler } from './components';
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
                        <Suspense fallback={<Spinner grow />}>
                            <NetConnectionHandler>
                                <Routes>
                                    <Route
                                        path={registerRoute.path}
                                        element={<registerRoute.Component />}
                                    />
                                    <Route
                                        path={loginRoute.path}
                                        element={<loginRoute.Component />}
                                    />
                                    {routes.map(({ path, Component }) => (
                                        <Route
                                            key={path}
                                            path={path}
                                            element={
                                                // <ProtectedRoute>
                                                <Component />
                                                // </ProtectedRoute>
                                            }
                                        />
                                    ))}
                                </Routes>
                            </NetConnectionHandler>
                        </Suspense>
                    </Layout>
                </BrowserRouter>
            </NotificationProvider>
        </Sentry.ErrorBoundary>
    );
}

export default Sentry.withProfiler(App);
