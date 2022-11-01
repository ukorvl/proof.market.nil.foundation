/**
 * @file Utility function.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

/**
 * Drops all nullable values from array in a type safe manner.
 *
 * @param value Any value.
 * @returns Filtered array with only nonNullable values.
 */
export const notEmpty = <T>(value: T): value is NonNullable<T> => {
    return value !== null && value !== undefined;
};
