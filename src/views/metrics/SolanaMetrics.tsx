import { ReactElement } from 'react';
import { Container, Row, Col } from '@nilfoundation/react-components';
import { GrafanaEmbed } from './components';
    
export const SolanaMetrics = (): ReactElement => {
    return (
        <Container>
            <Row>
                <Col md={7} sm={12}>
                    <GrafanaEmbed
                        panelId="13"
                        title="Proof time gen"
                        height={350}
                    />
                    <GrafanaEmbed
                        panelId="7"
                        title="Mem usage"
                        height={350}
                    />
                    <GrafanaEmbed
                        panelId="10"
                        title="Proof cost"
                        height={350}
                    />
                </Col>
                <Col md={5} sm={12}>
                    <GrafanaEmbed
                        panelId="2"
                        title="Proof time gen"
                        height={720}
                    />
                    <GrafanaEmbed
                        panelId="12"
                        title="Proof"
                        height={350}
                    />
                </Col>
            </Row>
        </Container>
    );
}
