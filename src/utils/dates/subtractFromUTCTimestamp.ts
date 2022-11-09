/**
 * @file Utility function.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

import dayjs, { ManipulateType } from 'dayjs';
import { UTCTimestamp } from 'lightweight-charts';
import { getUTCTimestamp } from './getUTCTimestamp';

/**
 * Subtract any time value from provided UTCTimestamp {@link UTCTimestamp}.
 *
 * @param utcTimestamp - Timestamp.
 * @param timeValue - Value to subtract.
 * @param {ManipulateType} unit - Unit to subtract.
 * @returns Date sting.
 */
export const subtractFromUTCTimestamp = (
    utcTimestamp: UTCTimestamp,
    timeValue: number,
    unit?: ManipulateType,
): UTCTimestamp => {
    return getUTCTimestamp(
        dayjs(utcTimestamp * 1000)
            .subtract(timeValue, unit)
            .toISOString(),
    );
};
