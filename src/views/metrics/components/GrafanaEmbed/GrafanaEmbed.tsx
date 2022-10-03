import { ReactElement } from 'react';
import { Embed } from '@nilfoundation/react-components';
import './GrafanaEmbed.scss';

/**
 * Props.
 */
type GrafanaEmbedProps = {
    panelId: string;
    title: string;
    height?: number;
};

export const GrafanaEmbed = ({ panelId, title, height }: GrafanaEmbedProps): ReactElement => {
    const srcUrl = `${process.env.REACT_APP_API_URL}&panelId=${panelId}`;

    return (
        <div
            className="embedContainer"
            style={{ height: `${height}px` }}
        >
            <Embed
                className="grafanaEmbed"
                title={title}
                source={srcUrl}
            />
        </div>
    );
};
