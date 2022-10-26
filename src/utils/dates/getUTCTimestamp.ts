/**
 * @file Utility function.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

/**
 * Get UTCTimestamp from date string.
 *
 * @param dateString - Date string.
 * @returns UTCTimestamp.
 */
export const getUTCTimestamp = (dateString: string): number =>
    new Date(dateString).getTime() / 1000;
