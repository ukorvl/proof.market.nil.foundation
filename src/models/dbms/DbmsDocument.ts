/**
 * @file Type declaration.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

/**
 * Database default document properties.
 */
export interface DbmsDocument {
    /**
     * Internal id.
     */
    _id: string;
    /**
     * Internal key.
     */
    _key: string;
    /**
     * Internal update key.
     */
    _rev: string;
}
