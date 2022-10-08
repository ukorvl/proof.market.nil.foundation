
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
import { DashboardCard, CurcuitsList, CircuitDetailedInfo, OrderBook } from '../components';

/**
 * Login view.
 *
 * @returns React component.
 */
const LoginView = (): ReactElement => (
    <Container as="main" fluid>
        <Row>
            <Col xs={12} md={3}>
                <CurcuitsList />
            </Col>
            <Col xs={12} md={9}>
                <DashboardCard>
                    <h4>Dashboard</h4>
                </DashboardCard>
            </Col>
            <Col xs={12} md={3}>
                <CircuitDetailedInfo />
            </Col>
            <Col xs={12} md={3}>
                <OrderBook />
            </Col>
        </Row>
    </Container>
);

export default LoginView;
