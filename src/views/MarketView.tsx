/**
 * @file React component.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

import { ReactElement } from 'react';
import { Container, Row, Col } from '@nilfoundation/react-components';
import {
    CircuitsList,
    CircuitDetailedInfo,
    OrderManagementContextProvider,
    CircuitDashboard,
    OrderBook,
    CreateOrdersPanel,
    TradeHistory,
    ManageOrdersPanel,
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
                    <Col
                        xs={12}
                        md={7}
                        lg={8}
                    >
                        <CircuitDashboard />
                    </Col>
                    <OrderManagementContextProvider>
                        <Col
                            xs={12}
                            md={5}
                            lg={4}
                        >
                            <OrderBook />
                        </Col>
                        <Col
                            xs={12}
                            md={4}
                        >
                            <CreateOrdersPanel />
                        </Col>
                        <Col
                            xs={12}
                            md={4}
                        >
                            <ManageOrdersPanel />
                        </Col>
                        <Col
                            xs={12}
                            md={4}
                        >
                            <TradeHistory />
                        </Col>
                    </OrderManagementContextProvider>
                </Row>
            </Col>
        </Row>
    </Container>
);

export default MarketView;
