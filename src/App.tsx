/**
 * @file App.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

import { ReactElement, Suspense } from 'react';
import { Routes, Route, HashRouter } from 'react-router-dom';
import { Layout, NotificationProvider, Spinner } from '@nilfoundation/react-components';
import { ErrorBoundary, withProfiler } from '@sentry/react';
import { Helmet } from 'react-helmet';
import {
    Header,
    Footer,
    ProtectedRoute,
    NetConnectionHandler,
    ReadonlyAccessProvider,
    AuthContainer,
} from './components';
import { routes, loginRoute, registerRoute, isAllowPathReadonlyAccess } from './routing';
import ErrorView from './views/ErrorView';

const baseDocumentTitle = process.env.REACT_APP_SITE_DEFAULT_TITLE;

// TODO - replace HashRouter with BrowserRouter after migrating from gh pages
/**
 * @returns App.
 */
function App(): ReactElement {
    return (
        <ErrorBoundary fallback={<ErrorView />}>
            <NotificationProvider>
                <HashRouter>
                    <Helmet
                        titleTemplate={`${baseDocumentTitle} | %s`}
                        defaultTitle={baseDocumentTitle}
                    />
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
                                                    <ProtectedRoute
                                                        readonlyAccess={isAllowPathReadonlyAccess(
                                                            path,
                                                        )}
                                                    >
                                                        <Component />
                                                    </ProtectedRoute>
                                                </ReadonlyAccessProvider>
                                            }
                                        />
                                    ))}
                                </Routes>
                            </NetConnectionHandler>
                        </Suspense>
                    </Layout>
                </HashRouter>
            </NotificationProvider>
        </ErrorBoundary>
    );
}

export default withProfiler(App);
