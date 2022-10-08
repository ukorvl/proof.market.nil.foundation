/**
 * @file Type declaration.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

import { Currency } from "../../enums";

/**
 * Circuit.
 */
export type Circuit = {
    /**
     * Id.
     */
    id: string;
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
}
