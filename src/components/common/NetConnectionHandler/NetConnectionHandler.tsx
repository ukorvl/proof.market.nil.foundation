/**
 * @file React component.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

import { ReactElement, ReactNode, useEffect, useState } from 'react';
import OfflineView from 'src/views/OfflineView';

/**
 * Props.
 */
type NetConnectionHandlerProps = {
    children?: ReactNode;
};

/**
 * Social links.
 *
 * @param {NetConnectionHandlerProps} props Props.
 * @returns React component.
 */
export const NetConnectionHandler = ({ children }: NetConnectionHandlerProps): ReactElement => {
    const [online, setOnline] = useState(window.navigator.onLine);

    useEffect(() => {
        const setIsOnline = () => setOnline(true);
        const setIsOffline = () => {
            setOnline(false);
        };

        window.addEventListener('online', setIsOnline);
        window.addEventListener('offline', setIsOffline);

        return () => {
            window.removeEventListener('online', setIsOnline);
            window.removeEventListener('offline', setIsOffline);
        };
    }, [setOnline]);

    return <>{online ? children : <OfflineView />}</>;
};
