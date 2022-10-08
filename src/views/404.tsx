
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

/**
 * 404 view.
 *
 * @returns React component.
 */
const Page404 = (): ReactElement => (
    <Container as="main" fluid>
        <Row>
            <Col xs={12} className="text-center">
                This page does not exist.
            </Col>
        </Row>
    </Container>
);

export default Page404;
