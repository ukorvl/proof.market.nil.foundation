/**
 * @file React component.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

import { ReactElement } from 'react';
import { DashboardCard } from 'src/components/common';
import { selectCurrentCircuit, useAppSelector } from 'src/redux';
import { renderDashOnEmptyValue } from 'src/utils';
import { PriceChangeIndicator } from '../PriceChangeIndicator';
import styles from './CircuitInfoPanel.module.scss';

/**
 * Panel with circuit info.
 *
 * @returns React component.
 */
export const CircuitInfoPanel = (): ReactElement => {
    const currentCircuit = useAppSelector(selectCurrentCircuit);
    const circuitInfo = useAppSelector(s =>
        s.circuitsState.circuitsInfo.find(x => x.circuit_id === currentCircuit?.id),
    );
    const change = circuitInfo?.daily_change;

    return (
        <DashboardCard className={styles.container}>
            <div>
                {`${currentCircuit?.name.toUpperCase()} (${currentCircuit?.info.toUpperCase()})/USD`}
            </div>
            <div>
                <div className={`text-muted ${styles.title}`}>Current cost</div>
                <div>{renderDashOnEmptyValue(circuitInfo?.current)}</div>
            </div>
            <div>
                <div className={`text-muted ${styles.title}`}>24h Change</div>
                <div>
                    {!!change ? (
                        <PriceChangeIndicator change={change} />
                    ) : (
                        renderDashOnEmptyValue(undefined)
                    )}
                </div>
            </div>
            <div>
                <div className={`text-muted ${styles.title}`}>24h High</div>
                <div>{renderDashOnEmptyValue(circuitInfo?.max)}</div>
            </div>
            <div>
                <div className={`text-muted ${styles.title}`}>24h Low</div>
                <div>{renderDashOnEmptyValue(circuitInfo?.min)}</div>
            </div>
            <div>
                <div className={`text-muted ${styles.title}`}>24h Volume</div>
                <div>{renderDashOnEmptyValue(circuitInfo?.volume, 0)}</div>
            </div>
        </DashboardCard>
    );
};
