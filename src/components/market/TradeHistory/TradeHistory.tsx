/**
 * @file React component.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

import { ReactElement } from 'react';
import { useInfiniteLoadItems } from 'src/hooks';
import { getCompletedTradeOrdersByLimit } from 'src/api';
import { DashboardCard } from '../../common';
import { TradeHistoryTable } from './TradeHistoryTable';
import styles from './TradeHistory.module.scss';

/**
 * Trade history component.
 *
 * @returns React component.
 */
export const TradeHistory = (): ReactElement => {
    const data = useInfiniteLoadItems({ fetcher: getCompletedTradeOrdersByLimit });

    return (
        <DashboardCard>
            <h4>Trades</h4>
            <div className={styles.container}>
                <TradeHistoryTable />
            </div>
        </DashboardCard>
    );
};
