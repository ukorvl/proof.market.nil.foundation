/**
 * @file React component.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

import type { ReactElement } from 'react';
import { Spinner } from '@nilfoundation/react-components';
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
    const selectedCircuitKey = useAppSelector(selectCurrentCircuitKey);
    const loadingCircuits = useAppSelector(s => s.circuitsState.isLoading);

    return (
        <DashboardCard>
            <h4>Trades</h4>
            <div className={styles.container}>
                {loadingCircuits && selectedCircuitKey === undefined && <Spinner grow />}
                {selectedCircuitKey !== undefined ? (
                    <TradeHistoryTable
                        key={selectedCircuitKey}
                        selectedCircuitKey={selectedCircuitKey}
                    />
                ) : (
                    <h5>Select circuit to display trade history.</h5>
                )}
            </div>
        </DashboardCard>
    );
};
