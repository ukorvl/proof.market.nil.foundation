/**
 * @file App.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

import { ReactElement, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import {
    Layout,
    ErrorBoundary,
    NotificationProvider,
    Spinner,
} from '@nilfoundation/react-components';
import { Header, Footer, ProtectedRoute } from './components';
import { routes, loginRoute } from './routing';

/**
 * @returns App.
 */
function App(): ReactElement {
    return (
        <ErrorBoundary>
            <NotificationProvider>
                <BrowserRouter>
                    <Layout
                        header={<Header />}
                        footer={<Footer />}
                        stickyHeader
                    >
                        <Suspense fallback={<Spinner grow />}>
                            <Routes>
                                <Route
                                    path={loginRoute.path}
                                    element={<loginRoute.Component />}
                                />
                                {routes.map(({ path, Component }) => (
                                    <Route
                                        key={path}
                                        path={path}
                                        element={
                                            <ProtectedRoute>
                                                <Component />
                                            </ProtectedRoute>
                                        }
                                    />
                                ))}
                            </Routes>
                        </Suspense>
                    </Layout>
                </BrowserRouter>
            </NotificationProvider>
        </ErrorBoundary>
    );
}

export default App;
