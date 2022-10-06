/**
 * @file App.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout, ErrorBoundary } from '@nilfoundation/react-components';
import { Header, Footer } from './components';
import { DashboardView } from './views/dashboard';

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
                    <Routes>
                        <Route
                            path="/"
                            element={<DashboardView />}
                        />
                    </Routes>
                </Layout>
            </BrowserRouter>
        </ErrorBoundary>
    );
}

export default App;
