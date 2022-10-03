import { ReactElement } from 'react';
import { Row, Col } from '@nilfoundation/react-components';
import { GrafanaEmbed } from './components';

export const SolanaMetrics = (): ReactElement => {
    return (
        <Row>
            <Col
                md={7}
                xs={12}
            >
                <GrafanaEmbed
                    panelId="13"
                    title="Proof Generation Time"
                    height={350}
                />
                <GrafanaEmbed
                    panelId="7"
                    title="Proof Generator Memory Usage"
                    height={350}
                />
                <GrafanaEmbed
                    panelId="10"
                    title="Proof Generation Cost (USD)"
                    height={350}
                />
            </Col>
            <Col
                md={5}
                xs={12}
            >
                <GrafanaEmbed
                    panelId="2"
                    title="Input Solana's Light-Client State"
                    height={720}
                />
                <GrafanaEmbed
                    panelId="12"
                    title="Proof Data"
                    height={350}
                />
            </Col>
        </Row>
    );
};
