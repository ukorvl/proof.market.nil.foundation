/**
 * @file Index.
 * @copyright Yury Korotovskikh 2023 <u.korotovskiy@nil.foundation>
 */

import { ReactElement, useEffect } from 'react';
import { set, pageview } from 'react-ga';
import { useLocation } from 'react-router-dom';

/**
 * Google Analytics location change tracker.
 *
 * @returns React component.
 */
export const GALocationTracker = (): ReactElement => {
    const { pathname } = useLocation();

    useEffect(() => {
        set({ page: pathname });
        pageview(pathname);
    }, [pathname]);

    return <></>;
};
