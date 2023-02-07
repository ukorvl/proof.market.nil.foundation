/**
 * @file Type declaration.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

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
    name: string;
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
    sender?: string;
    /**
     * Childs.
     */
    childs: Array<Circuit>;
    /**
     * If equals true, statement should be hidden.
     */
    isPrivate?: boolean;
    /**
     * Repository url.
     */
    url?: string;
};
