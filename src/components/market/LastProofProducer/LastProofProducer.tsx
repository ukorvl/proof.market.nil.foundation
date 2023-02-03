/**
 * @file React component.
 * @copyright Yury Korotovskikh <u.korotovskiy@nil.foundation>
 */

import type { ReactElement } from 'react';
import { DashboardCard } from 'src/components';
import { useAppSelector } from 'src/redux';
import styles from './LastProofProdcuer.module.scss';

/**
 * Displays last proof producer.
 *
 * @returns React component.
 */
export const LastProofProducer = (): ReactElement => {
    const lastProofProducer = useAppSelector(
        s =>
            s.circuitsState.lastProofProducer?.find(
                x => x?.statement_key === `${s.circuitsState.selectedKey}`,
            )?.sender,
    );

    return (
        <DashboardCard className={styles.container}>
            <h4>Last proof producer:</h4>
            {lastProofProducer ? (
                <h5>
                    <span className="text-muted">Username:</span>
                    {` ${lastProofProducer}`}
                </h5>
            ) : (
                <h5>No last proof producer data was found.</h5>
            )}
        </DashboardCard>
    );
};
