/**
 * @file Utility function.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

/**
 * Round date to.
 */
export enum RoundDateTo {
    minute = 'minute',
    hour = 'hour',
    day = 'day',
}

/**
 * Round date string to provided time value. Always rounds down.
 *
 * @param dateString Date string.
 * @param floorTo Round date to.
 * @returns Date.
 */
export const floorDateTo = (dateString: string, floorTo: RoundDateTo): Date => {
    const date = new Date(dateString);

    switch (floorTo) {
        case RoundDateTo.minute:
            date.setSeconds(0, 0);
            break;
        case RoundDateTo.hour:
            date.setMinutes(0, 0, 0);
            break;
        case RoundDateTo.day:
            date.setHours(0, 0, 0, 0);
            break;
    }

    return date;
};
