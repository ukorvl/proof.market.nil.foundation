import { ReactElement } from 'react';
import { Container, Row, Col } from '..';

export const Footer = (): ReactElement =>
    <footer className="text-center">
        <div className="footer-below">
            <Container>
                <Row>
                    <Col>
                        {`Copyright © =nil; Foundation ${ new Date().getFullYear() }`}
                    </Col>
                </Row>
            </Container>
        </div>
    </footer>;
