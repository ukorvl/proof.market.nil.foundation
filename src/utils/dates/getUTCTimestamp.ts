/**
 * @file Utility function.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

import { roundDateToMinute } from './roundDateToMinute';

/**
 * Get UTCTimestamp from date string.
 *
 * @param dateString - Date string.
 * @param roundToMinute - Should round date to minute.
 * @returns UTCTimestamp.
 */
export const getUTCTimestamp = (dateString: string, roundToMinute?: boolean): number => {
    const date = roundToMinute ? roundDateToMinute(dateString) : new Date(dateString);

    return Math.trunc(date.getTime() / 1000);
};
