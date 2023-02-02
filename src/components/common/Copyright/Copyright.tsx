/**
 * @file React component.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

import type { ReactElement } from 'react';

/**
 * Copyright text.
 *
 * @returns React component.
 */
export const Copyright = (): ReactElement => {
    return <>{`Copyright © =nil; Foundation ${new Date().getFullYear()}`}</>;
};
