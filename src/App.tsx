import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "@nilfoundation/react-components";
import { Header, Footer } from "./components";
import { MetricsView } from './views';

function App() {
  return (
    <BrowserRouter>
        <Layout navbar={<Header />} footer={<Footer />}>
            <Routes>
                <Route path="/" element={ <MetricsView/> } />
            </Routes>
        </Layout>
    </BrowserRouter>
  );
}

export default App;
