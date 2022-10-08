/**
 * @file App.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

import { Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout, ErrorBoundary } from '@nilfoundation/react-components';
import { Header, Footer, Fallback } from './components';
import { routes } from './routing';

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
                            {routes.map(({path, Component}) =>
                                <Route key={path} path={path} element={<Component />} />)}
                        </Routes>
                    </Suspense>
                </Layout>
            </BrowserRouter>
        </ErrorBoundary>
    );
}

export default App;
