/**
 * @file React component.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

import { ReactElement } from 'react';
import { selectCurrentCircuitId, useAppSelector } from 'src/redux';
import { DashboardCard } from '../../common';
import { TradeHistoryTable } from './TradeHistoryTable';
import styles from './TradeHistory.module.scss';

/**
 * Trade history component.
 *
 * @returns React component.
 */
export const TradeHistory = (): ReactElement => {
    const selctedCircuitId = useAppSelector(selectCurrentCircuitId);

    return (
        <DashboardCard>
            <h4>Trades</h4>
            <div className={styles.container}>
                {selctedCircuitId !== undefined ? (
                    <TradeHistoryTable selctedCircuitId={selctedCircuitId} />
                ) : (
                    <h5>Select circuit to display trade history.</h5>
                )}
            </div>
        </DashboardCard>
    );
};
