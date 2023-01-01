/**
 * @file React component.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

import { ReactElement } from 'react';
import { Container, Row, Col } from '@nilfoundation/react-components';
import { Helmet } from 'react-helmet-async';
import { ProofList, SelectedProofContextProvider, ProofContentCard } from '../components';

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
            <title>Portfolio</title>
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
                    <ProofContentCard />
                </Col>
            </SelectedProofContextProvider>
        </Row>
    </Container>
);

export default PortfolioView;
