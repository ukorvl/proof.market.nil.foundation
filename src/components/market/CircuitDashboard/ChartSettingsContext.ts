/**
 * @file React context.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

import { createContext } from 'react';
import { DateUnit } from 'src/enums';

/**
 * Context type.
 */
type ChartSettingsContectModel = {
    dataRange: DateUnit;
};

/**
 * Data range context.
 */
export const ChartSettingsContext = createContext<ChartSettingsContectModel>(
    {} as ChartSettingsContectModel,
);
