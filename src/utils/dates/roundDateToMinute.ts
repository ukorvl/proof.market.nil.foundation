/**
 * @file Utility function.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

/**
 * Round date string to nearest minute.
 *
 * @param dateString Date string.
 * @returns Date.
 */
export const roundDateToMinute = (dateString: string): Date => {
    const date = new Date(dateString);
    date.setSeconds(0);

    return date;
};
