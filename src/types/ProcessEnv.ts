/* eslint-disable @typescript-eslint/no-namespace */

/**
 * @file Typings.
 * @copyright Yury Korotovskikh <u.korotovskiy@nil.foundation>
 */

import { requiredEnv } from '../checkEnv';

type RequiredServerEnvKeys = (typeof requiredEnv)[number];

declare global {
    namespace NodeJS {
        // eslint-disable-next-line @typescript-eslint/no-empty-interface
        interface ProcessEnv extends Record<RequiredServerEnvKeys, string> {}
    }
}

export {};
