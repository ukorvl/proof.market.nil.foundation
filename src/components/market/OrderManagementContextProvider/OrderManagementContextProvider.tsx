/**
 * @file React component.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

import { ReactElement, ReactNode, useState } from 'react';
import { CostAndEvalTime } from 'src/models';
import { OrderManagementContext } from './OrderManagementContext';

/**
 * Poprs.
 */
type OrderManagementContextProps = {
    children?: ReactNode;
};

/**
 * Order management panel.
 *
 * @param {OrderManagementContextProps} props Props.
 * @returns React component.
 */
export const OrderManagementContextProvider = ({
    children,
}: OrderManagementContextProps): ReactElement => {
    const [processing, setProcessing] = useState(false);
    const [selectedValues, setSelectedValues] = useState<CostAndEvalTime>();

    return (
        <OrderManagementContext.Provider
            value={{ processing, setProcessing, selectedValues, setSelectedValues }}
        >
            {children}
        </OrderManagementContext.Provider>
    );
};
