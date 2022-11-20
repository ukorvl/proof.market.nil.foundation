/**
 * @file React component.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

import { ReactElement } from 'react';
import { selectCurrentCircuit, useAppSelector } from 'src/redux';
import { PriceChangeIndicator } from '../PriceChangeIndicator';

/**
 * Current circuit info, displaying in fullscreen mode.
 *
 * @returns React component.
 */
export const FullScreenChartInfo = (): ReactElement => {
    const currentCircuit = useAppSelector(selectCurrentCircuit);
    const circuitInfo = useAppSelector(s =>
        s.circuitsState.circuitsInfo.find(x => x.circuit_id === currentCircuit?.id),
    );
    const cost = circuitInfo?.current_cost;
    const change = circuitInfo?.daily_change;

    return (
        <div className="fullScreenChartInfo">
            <div>
                {`${currentCircuit?.name.toUpperCase()} (${currentCircuit?.info.toUpperCase()})/USD`}
            </div>
            {cost && <div>{`${cost.toFixed(4)} $`}</div>}
            {!!change && <PriceChangeIndicator change={change} />}
        </div>
    );
};
