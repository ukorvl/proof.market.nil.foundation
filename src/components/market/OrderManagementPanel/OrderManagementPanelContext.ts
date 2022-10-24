/**
 * @file React context.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

import { createContext } from 'react';
import { CostAndEvalTime } from 'src/models';

/**
 * Context type.
 */
type OrderManagementPanelContextModel = {
    processing: boolean;
    setProcessing: (processing: boolean) => void;
    selectedValues?: CostAndEvalTime;
    setSelectedValues: (costAndEvalTime?: CostAndEvalTime) => void;
};

/**
 * Order management panel context.
 */
export const OrderManagementPanelContext = createContext<OrderManagementPanelContextModel>(
    {} as OrderManagementPanelContextModel,
);
