/**
 * @file Utility function.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

import { memo } from 'react';

/**
 * Allows use React.memo with generic component.
 *
 * @see https://github.com/DefinitelyTyped/DefinitelyTyped/issues/37087
 */
export const genericMemo: <T>(c: T) => T = memo;
