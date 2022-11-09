/**
 * @file Utility function.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

import { UTCTimestamp } from 'lightweight-charts';
import { floorDateTo, RoundDateTo } from './floorDateTo';

/**
 * Get UTCTimestamp from date string.
 *
 * @param dateString - Date string.
 * @param floorTo - Should round date to minute.
 * @returns UTCTimestamp.
 */
export const getUTCTimestamp = (dateString: string, floorTo?: RoundDateTo): UTCTimestamp => {
    const date = floorTo ? floorDateTo(dateString, floorTo) : new Date(dateString);

    return Math.trunc(date.getTime() / 1000) as UTCTimestamp;
};
