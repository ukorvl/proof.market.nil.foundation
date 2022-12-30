/**
 * @file React context.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

import { createContext } from 'react';
import { OrderBookPriceStep } from 'src/enums';

/**
 * Context type.
 */
type OrderBookSettingsContectModel = {
    priceStep: keyof typeof OrderBookPriceStep;
    setPriceStep: (s: keyof typeof OrderBookPriceStep) => void;
};

/**
 * Order book settings context.
 */
export const OrderBookSettingsContext = createContext<OrderBookSettingsContectModel>(
    {} as OrderBookSettingsContectModel,
);
