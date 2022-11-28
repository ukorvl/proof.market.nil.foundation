/**
 * @file Sentry configuration.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */
import * as Sentry from '@sentry/react';
import { BrowserTracing } from '@sentry/tracing';

/**
 * Configures sentry for app.
 *
 * @see {@link https://docs.sentry.io/platforms/javascript/guides/react/}
 */
export const configureSentry = (): void => {
    if (process.env.NODE_ENV !== 'production') {
        return;
    }

    Sentry.init({
        dsn: process.env.SENTRY_DSN,
        integrations: [new BrowserTracing()],
        tracesSampleRate: 1.0,
    });
};
