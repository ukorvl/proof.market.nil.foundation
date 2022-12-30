/**
 * @file App.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

import { ReactElement } from 'react';
import { Layout, Spinner } from '@nilfoundation/react-components';
import { Outlet } from 'react-router-dom';
import { Header, Footer, ReadonlyAccessProvider } from '../components';

/**
 * Main app layout.
 *
 * @returns React element.
 */
const MainLayout = (): ReactElement => {
    return (
        <Layout
            header={<Header />}
            footer={<Footer />}
            stickyHeader
        >
            <ReadonlyAccessProvider fallback={<Spinner grow />}>
                <Outlet />
            </ReadonlyAccessProvider>
        </Layout>
    );
};

export default MainLayout;
