/**
 * @file Type declaration.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

/**
 * Order dto.
 */
export type OrderDto = {
    circuit_id: string;
    public_input: Record<string, string>;
    sender: string;
    wait_period: number;
};
