/**
 * @file Utility function.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

import dayjs from 'dayjs';

/**
 * Formats date string.
 *
 * @param dateString - Date string.
 * @param format - Format.
 * @returns Formatted date string representation.
 */
export const formatDate = (dateString: string, format: string): string =>
    dayjs(dateString).format(format);
