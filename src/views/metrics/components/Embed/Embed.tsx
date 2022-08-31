import { ReactElement, useState } from 'react';
import { Spinner } from '@nilfoundation/react-components';
import './Embed.scss';

/**
 * Props.
 */
type EmbedProps = {
    panelId: string;
    title: string;
    height?: number;
}

export const Embed = ({
    panelId,
    title,
    height
}: EmbedProps): ReactElement => {
    const [loaded, setLoaded] = useState(false);
    const srcUrl = `${process.env.REACT_APP_API_URL}&panelId=${panelId}`;

    return (
        <div
            className="embed"
            style={{height: `${height}px`}}>
            {
                !loaded && <Spinner />
            }
            <iframe
                src={srcUrl}
                onLoad={(): void => setLoaded(true)}
                className={`${loaded ? '' : 'notVisible'}`}
                title={title}
                frameBorder="0"
            />
        </div>
    );
};
