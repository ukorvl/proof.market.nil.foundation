/**
 * @file Env variables checker.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

/**
 * Required env variables.
 */
export const requiredEnv = [
    'REACT_APP_BASE_API_URL',
    'REACT_APP_DBMS_DEFAULT_DATABASE',
    'REACT_APP_READONLY_USER',
    'REACT_APP_FORMSPREE_FORM_ID',
    'REACT_APP_SITE_DEFAULT_TITLE',
    'REACT_APP_PROOFMARKET_TOOLCHAIN_REPO',
] as const;

/**
 * Checks env variables definition.
 *
 * @throws An error if any required env is not defined.
 * @returns .
 */
export const checkEnvVariablesAreDefined = (): void =>
    requiredEnv.forEach(x => {
        if (!process.env[x]) {
            throw new Error(
                'All required environment variables should be defined before running this app',
            );
        }
    });
