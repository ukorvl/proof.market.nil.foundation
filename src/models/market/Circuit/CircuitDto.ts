/**
 * @file Type declaration.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

import { Currency } from '../../../enums';
import { DbmsDocument } from '../../dbms';

/**
 * Circuit dto.
 */
export interface CircuitDto extends DbmsDocument {
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
     * Description.
     */
    description: string;
    /**
     * Public assignment.
     */
    public_assignment: Record<string, string>;
    /**
     * Desc.
     */
    desc: string;
    /**
     * Bp.
     */
    bp: string;
}
