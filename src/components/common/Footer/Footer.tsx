/**
 * @file React component.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

import { ReactElement } from 'react';
import { Container, Row, Col, Icon } from '@nilfoundation/react-components';
import { socialLinks } from '../../../constants';
import './Footer.scss';

/**
 * Footer.
 *
 * @returns React component.
 */
export const Footer = (): ReactElement => (
    <Container>
        <Row>
            <Col>
                <ul className="socialLinks">
                    {socialLinks.map(({ icon, url }) => (
                        <li key={icon}>
                            <a href={url}>
                                <Icon
                                    iconName={`fa-brands fa-${icon}`}
                                    srOnlyText={`${icon} link`}
                                />
                            </a>
                        </li>
                    ))}
                </ul>
            </Col>
        </Row>
        <Row className="text-center">
            <Col>{`Copyright © =nil; Foundation ${new Date().getFullYear()}`}</Col>
        </Row>
    </Container>
);
