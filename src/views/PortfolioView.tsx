/**
 * @file React component.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

import { ReactElement } from 'react';
import { Container, Row, Col } from '@nilfoundation/react-components';
import { ProofList } from '../components';

/**
 * Portfolio view.
 *
 * @returns React component.
 */
const PortfolioView = (): ReactElement => (
    <Container as="main">
        <Row>
            <Col xs={12}>
                <ProofList />
            </Col>
        </Row>
    </Container>
);

export default PortfolioView;
