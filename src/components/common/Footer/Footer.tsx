/**
 * @file React component.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

import { ReactElement } from 'react';
import { Container, Row, Col } from '@nilfoundation/react-components';
import { SocialLinks } from '../SocialLinks';
import { Copyright } from '../Copyright';
import styles from './Footer.module.scss';

/**
 * Footer.
 *
 * @returns React component.
 */
export const Footer = (): ReactElement => (
    <Container className={styles.footer}>
        <Row>
            <Col>
                <SocialLinks />
            </Col>
        </Row>
        <Row className="text-center">
            <Col>
                <Copyright />
            </Col>
        </Row>
    </Container>
);
