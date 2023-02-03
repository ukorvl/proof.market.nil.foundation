/**
 * @file React component.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

import type { ReactElement } from 'react';
import { selectCurrentCircuitKey, useAppSelector } from 'src/redux';
import { DashboardCard } from '../../common';
import { TradeHistoryTable } from './TradeHistoryTable';
import styles from './TradeHistory.module.scss';

/**
 * Trade history component.
 *
 * @returns React component.
 */
export const TradeHistory = (): ReactElement => {
    const selctedCircuitId = useAppSelector(selectCurrentCircuitKey);

    return (
        <DashboardCard>
            <h4>Trades</h4>
            <div className={styles.container}>
                {selctedCircuitId !== undefined ? (
                    <TradeHistoryTable selctedCircuitKey={selctedCircuitId} />
                ) : (
                    <h5>Select circuit to display trade history.</h5>
                )}
            </div>
        </DashboardCard>
    );
};
