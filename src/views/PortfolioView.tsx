/**
 * @file React component.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

import type { ReactElement } from 'react';
import { Container, Row, Col } from '@nilfoundation/react-components';
import { Helmet } from 'react-helmet-async';
import { ProofList, ProofContentCard } from '../components';

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
        </Row>
    </Container>
);

export default PortfolioView;
