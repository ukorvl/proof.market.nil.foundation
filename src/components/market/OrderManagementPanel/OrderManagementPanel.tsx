/**
 * @file React component.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

import { ReactElement, useState } from 'react';
import { Col } from '@nilfoundation/react-components';
import { CostAndEvalTime } from 'src/models';
import { OrderManagementPanelContext } from './OrderManagementPanelContext';
import { OrderBook } from '../OrderBook';
import { CreateOrdersPanel } from '../CreateOrdersPanel';

/**
 * Order management panel.
 *
 * @returns React component.
 */
export const OrderManagementPanel = (): ReactElement => {
    const [processing, setProcessing] = useState(false);
    const [selectedValues, setSelectedValues] = useState<CostAndEvalTime>();

    return (
        <OrderManagementPanelContext.Provider
            value={{ processing, setProcessing, selectedValues, setSelectedValues }}
        >
            <Col
                xs={12}
                md={8}
            >
                <CreateOrdersPanel />
            </Col>
            <Col
                xs={12}
                md={4}
            >
                <OrderBook />
            </Col>
        </OrderManagementPanelContext.Provider>
    );
};
