import { ReactElement } from 'react';
import { Container, Row, Col } from '@nilfoundation/react-components';
import { Embed } from './components';
    
export const SolanaMetrics = (): ReactElement => {
    return (
        <Container>
            <Row>
                <Col md={7} sm={12}>
                    <Embed
                        panelId="10"
                        title="Proof time gen"
                        height={350}
                    />
                    <Embed
                        panelId="7"
                        title="Mem usage"
                        height={350}
                    />
                </Col>
                <Col md={5} sm={12}>
                    <Embed
                        panelId="2"
                        title="Proof time gen"
                        height={450}
                    />
                    <Embed
                        panelId="12"
                        title="Proof"
                        height={250}
                    />
                </Col>
            </Row>
        </Container>
    );
}
