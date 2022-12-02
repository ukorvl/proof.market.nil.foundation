/**
 * @file Type declaration.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

import { CircuitDto } from './CircuitDto';

/**
 * Circuit.
 */
export type Circuit = {
    /**
     * Id.
     */
    id: string;
} & CircuitDto;

/**
 * Returns circuit public data without hidden fields.
 *
 * @param c Circuit.
 * @returns Public circuit.
 */
export const getCircuitPublicData = (c: Circuit): Partial<Circuit> =>
    (Object.keys(c) as Array<keyof Circuit>).reduce((acc, cur) => {
        if (!circuitHiddenFields.includes(cur)) {
            acc[cur] = c[cur];
        }

        return acc;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    }, {} as Record<keyof Circuit, any>);

/**
 * Hidden circuit fields, which user schould not be able to see.
 */
const circuitHiddenFields: Array<keyof Circuit> = ['_id', '_key', '_rev'];
