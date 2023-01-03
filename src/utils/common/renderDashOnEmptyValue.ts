/**
 * @file Utility function.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

/**
 * Renders value or long dash symbol if value is empty.
 *
 * @param value Numeric value.
 * @param [fractionDigits] Number of digits after the value decimal point.
 * @returns Value or long dash symbol.
 */
export const renderDashOnEmptyValue = (value?: number | null, fractionDigits = 4): string =>
    value ? value?.toFixed(fractionDigits) : longDash;

/**
 * Long dash HTML symbol.
 */
const longDash = '—';
