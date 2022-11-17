/**
 * @file React component.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

import { ReactElement } from 'react';
import { Container, Row, Col } from '@nilfoundation/react-components';

/**
 * Proof generators view.
 *
 * @returns React component.
 */
const ProofGeneratorsView = (): ReactElement => (
    <Container
        as="main"
        fluid
    >
        <Row>
            <Col
                xs={12}
                md={3}
            >
                .
            </Col>
            <Col
                xs={12}
                md={9}
            >
                .
            </Col>
        </Row>
    </Container>
);

export default ProofGeneratorsView;
