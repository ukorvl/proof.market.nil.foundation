/**
 * @file Type declaration.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

import { Currency } from '../../../enums';

/**
 * Circuit.
 */
export type CircuitDto = {
    /**
     * Name.
     */
    name: Currency;
    /**
     * Github repository.
     */
    repository: string;
    /**
     * Info.
     */
    info: string;
    /**
     * Describe.
     */
    describe: string;
    /**
     * Public assignment.
     */
    public_assignmen: string;
    /**
     * Desc.
     */
    desc: string;
    /**
     * Bp.
     */
    bp: string;
};
