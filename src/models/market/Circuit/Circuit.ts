/**
 * @file Type declaration.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

import { Currency } from 'src/enums';

/**
 * Circuit.
 */
export type Circuit = {
    /**
     * Id.
     */
    _key: string;
    /**
     * Name.
     */
    name: Currency;
    /**
     * .
     */
    createdOn?: number;
    /**
     * .
     */
    updatedOn?: number;
    /**
     * Description.
     */
    description?: string;
    /**
     * .
     */
    inputDescription?: string;
    /**
     * .
     */
    user_id?: string;
    /**
     * .
     */
    sender?: string;
    /**
     * Childs.
     */
    childs: Array<Circuit>;
    /**
     * If equals true, statement should be hidden.
     */
    isPrivate?: boolean;
};
