/**
 * @file React context.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

import { createContext } from 'react';
import { Row } from 'react-table';
import { ManageOrdersData } from 'src/models';

/**
 * Context type.
 */
type ManageOrdersPanelContextModel = {
    processing: boolean;
    setProcessing: (processing: boolean) => void;
    selectedRow: Row<ManageOrdersData> | null;
    setSelectedRow: (open: Row<ManageOrdersData> | null) => void;
};

/**
 * Order management context.
 */
export const ManageOrdersPanelContext = createContext<ManageOrdersPanelContextModel>(
    {} as ManageOrdersPanelContextModel,
);
