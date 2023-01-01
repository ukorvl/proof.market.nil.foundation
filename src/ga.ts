/**
 * @file Google analytics setup.
 * @copyright Yury Korotovskikh 2023 <u.korotovskiy@nil.foundation>
 */

import { initialize, InitializeOptions } from 'react-ga';

/**
 * Ga initialize options.
 */
const gaInitOptions: InitializeOptions = {};

/**
 * Configures ga for the app. Should be called before any other tracking functions will record any data.
 */
export default function configureGA(): void {
    const measurementId = process.env.REACT_APP_GA_TRACKING_ID;

    if (process.env.NODE_ENV === 'development') {
        return;
    }

    if (!measurementId) {
        return;
    }

    initialize(measurementId, gaInitOptions);
}
