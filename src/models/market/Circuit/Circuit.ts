/**
 * @file Type declaration.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

import type { CircuitDto } from './CircuitDto';

/**
 * Circuit.
 */
export type Circuit = {
    /**
     * Id.
     */
    id: number;
} & CircuitDto;
