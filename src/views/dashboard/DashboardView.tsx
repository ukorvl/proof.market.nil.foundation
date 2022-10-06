
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
import { DashboardCard, ProofSystemSelect, CurrenciesList } from '../../components';

/**
 * Dashboard view.
 *
 * @returns React component.
 */
export const DashboardView = (): ReactElement => (
    <Container as="main" fluid>
        <Row>
            <Col xs={12} md={3}>
                <DashboardCard>
                    <ProofSystemSelect />
                    <CurrenciesList />
                </DashboardCard>
            </Col>
            <Col xs={12} md={9}><DashboardCard>Dashboard</DashboardCard></Col>
        </Row>
    </Container>
);
