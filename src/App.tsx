/**
 * @file App.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

import { Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout, ErrorBoundary } from '@nilfoundation/react-components';
import { Header, Footer, Fallback, ProtectedRoute } from './components';
import { routes, loginRoute } from './routing';

/**
 * @returns App.
 */
function App() {
    return (
        <ErrorBoundary>
            <BrowserRouter>
                <Layout
                    header={<Header />}
                    footer={<Footer />}
                    stickyHeader
                >
                    <Suspense fallback={<Fallback />}>
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
        </ErrorBoundary>
    );
}

export default App;
