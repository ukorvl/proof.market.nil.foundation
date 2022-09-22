import { ReactElement } from 'react';
import { Container, Row, Col } from '@nilfoundation/react-components';
import './Footer.scss';
import { SocialLinks } from './SocialLinks';

export const Footer = (): ReactElement =>
    <footer className="text-center">
        <div className="footer-below">
            <Container>
                <Row>
                    <Col>
                        <SocialLinks />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        {`Copyright © =nil; Foundation ${ new Date().getFullYear() }`}
                    </Col>
                </Row>
            </Container>
        </div>
    </footer>;
