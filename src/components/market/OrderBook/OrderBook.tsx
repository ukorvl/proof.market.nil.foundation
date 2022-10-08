/**
 * @file React component.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

import { ReactElement } from 'react';
import { DashboardCard } from '../DashboardCard';

/**
 * Order book.
 *
 * @returns React component.
 */
export const OrderBook = (): ReactElement => {
    return (
        <DashboardCard>
            OrderBook
        </DashboardCard>
    );
};
