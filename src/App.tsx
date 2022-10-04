import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from '@nilfoundation/react-components';
import { Header, Footer } from './components';
import { MetricsView } from './views';

function App() {
    return (
        <BrowserRouter>
            <Layout
                header={<Header />}
                footer={<Footer />}
                stickyHeader
            >
                <Routes>
                    <Route
                        path="/"
                        element={<MetricsView />}
                    />
                </Routes>
            </Layout>
        </BrowserRouter>
    );
}

export default App;
