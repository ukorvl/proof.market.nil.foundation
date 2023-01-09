/**
 * @file Utility function.
 * @copyright Yury Korotovskikh <u.korotovskiy@nil.foundation>
 */

import dayjs from 'dayjs';

/**
 * Returns current date in milliseconds.
 *
 * @returns .
 */
export const now = (): number => dayjs().unix();
