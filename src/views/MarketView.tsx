/**
 * @file React component.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

import { ReactElement } from 'react';
import { Container, Row, Col } from '@nilfoundation/react-components';
import {
    CircuitsList,
    CircuitDetailedInfo,
    OrderManagementPanel,
    CircuitDashboard,
} from '../components';

/**
 * Market view.
 *
 * @returns React component.
 */
const MarketView = (): ReactElement => (
    <Container
        as="main"
        fluid
    >
        <Row>
            <Col
                xs={12}
                md={3}
            >
                <CircuitsList />
                <CircuitDetailedInfo />
            </Col>
            <Col
                xs={12}
                md={9}
            >
                <Row>
                    <Col xs={12}>
                        <CircuitDashboard />
                    </Col>
                    <OrderManagementPanel />
                </Row>
            </Col>
        </Row>
    </Container>
);

export default MarketView;
