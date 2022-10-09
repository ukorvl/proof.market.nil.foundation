/**
 * @file Type declaration.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

import { CircuitDto } from './dto/CircuitDto';

/**
 * Circuit.
 */
export type Circuit = {
    /**
     * Id.
     */
    id: string;
} & CircuitDto;
