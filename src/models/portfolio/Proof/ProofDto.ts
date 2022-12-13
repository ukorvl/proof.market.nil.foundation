/**
 * @file Type declaration.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

/**
 * Proof dto.
 */
export type ProofDto = {
    /**
     * Proof unique id.
     */
    id: number;
    /**
     * Internal id.
     */
    _id: string;
    /**
     * Id of bid.
     */
    bid_id: string;
    /**
     * Proof.
     */
    proof: string;
};
