/**
 * @file React component.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

import { ReactElement } from 'react';
import { Container, Row, Col, Button, Variant, Size } from '@nilfoundation/react-components';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Path } from '../routing';

/**
 * 404 view.
 *
 * @returns React component.
 */
const Page404 = (): ReactElement => (
    <Container
        as="main"
        fluid
    >
        <Helmet>
            <title>Page not found</title>
        </Helmet>
        <Row>
            <Col
                xs={12}
                className="text-center"
            >
                This page does not exist.
                <p aria-hidden={true} />
                <Link to={Path.market}>
                    <Button
                        variant={Variant.primary}
                        size={Size.lg}
                    >
                        Back to market
                    </Button>
                </Link>
            </Col>
        </Row>
    </Container>
);

export default Page404;
