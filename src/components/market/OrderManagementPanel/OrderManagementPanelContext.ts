/**
 * @file React context.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

import { createContext } from 'react';

/**
 * Context type.
 */
type OrderManagementPanelContextModel = {
    processing: boolean;
    setProcessing: (processing: boolean) => void;
    selectedCost?: number;
    setSelectedCost: (cost: number) => void;
};

/**
 * Order management panel context.
 */
export const OrderManagementPanelContext = createContext<OrderManagementPanelContextModel>(
    {} as OrderManagementPanelContextModel,
);
