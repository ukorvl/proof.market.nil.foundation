/**
 * @file Enum declaration.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

import { RoundDateTo } from 'src/utils';

/**
 * Date range variant.
 */
export enum DateUnit {
    hour = 'hour',
    day = 'day',
    month = 'month',
}

/**
 * Generates date unit string represenation.
 *
 * @param unit Date unit.
 * @returns Date unit string represenation.
 */
export const getDateUnitDisplay = (unit: DateUnit): string => {
    switch (unit) {
        case DateUnit.hour:
            return '1h';
        case DateUnit.day:
            return 'D';
        case DateUnit.month:
            return 'M';
        default:
            return '';
    }
};

/**
 * Returns time scale date format based on provided date unit.
 *
 * @param unit Date unit.
 * @returns Date format.
 */
export const getDateFormatBasedOnDateUnit = (unit: DateUnit): string => {
    switch (unit) {
        case DateUnit.hour:
        case DateUnit.day:
            return 'DD.MM HH:mm';
        case DateUnit.month:
            return 'DD.MM';
        default:
            return '';
    }
};

/**
 * Returns round to value based on date unit.
 *
 * @param dateUnit Date unit.
 * @returns Round to value.
 */
export const getRoundToBasedOnDateUnit = (dateUnit: DateUnit): RoundDateTo => {
    switch (dateUnit) {
        case DateUnit.month:
            return RoundDateTo.day;
        case DateUnit.day:
            return RoundDateTo.hour;
        case DateUnit.hour:
            return RoundDateTo.minute;
    }
};
