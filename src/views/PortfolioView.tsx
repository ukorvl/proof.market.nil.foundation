/**
 * @file React component.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

import { ReactElement } from 'react';
import { Container, Row, Col } from '@nilfoundation/react-components';
import { Helmet } from 'react-helmet';
import { baseDocumentTitle } from 'src/constants';
import { ProofList, SelectedProofContextProvider, ProofView } from '../components';

/**
 * Portfolio view.
 *
 * @returns React component.
 */
const PortfolioView = (): ReactElement => (
    <Container
        as="main"
        fluid
    >
        <Helmet>
            <title>{`${baseDocumentTitle} | Portfolio`}</title>
        </Helmet>
        <Row>
            <SelectedProofContextProvider>
                <Col
                    xs={12}
                    md={3}
                >
                    <ProofList />
                </Col>
                <Col
                    xs={12}
                    md={9}
                >
                    <ProofView />
                </Col>
            </SelectedProofContextProvider>
        </Row>
    </Container>
);

export default PortfolioView;
