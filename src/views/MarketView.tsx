
/**
 * @file React component.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

import { ReactElement } from 'react';
import {
    Container,
    Row,
    Col,
} from '@nilfoundation/react-components';
import { DashboardCard, CurcuitsList, CircuitDetailedInfo, OrderBook, OrderManagementPanel } from '../components';

/**
 * Market view.
 *
 * @returns React component.
 */
const MarketView = (): ReactElement => (
    <Container as="main" fluid>
        <Row>
            <Col xs={12} md={3}>
                <CurcuitsList />
                <CircuitDetailedInfo />
            </Col>
            <Col xs={12} md={9}>
                <Container fluid>
                    <Row>
                        <Col xs={12}>
                            <DashboardCard>
                                <h4>Dashboard</h4>
                            </DashboardCard>
                        </Col>
                        <Col xs={12} md={4}>
                            <OrderBook />
                        </Col>
                        <Col xs={12} md={8}>
                            <OrderManagementPanel />
                        </Col>
                    </Row>
                </Container>
            </Col>
        </Row>
    </Container>
);

export default MarketView;
