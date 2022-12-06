/**
 * @file React component.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

import { ReactElement } from 'react';
import { dequal as deepEqual } from 'dequal';
import { Spinner } from '@nilfoundation/react-components';
import { useAppSelector } from 'src/redux';

/**
 * Props.
 */
type CircuitStatsCardProps = {
    circuitId: string;
};

/**
 * Circuit statistics card.
 *
 * @param {CircuitStatsCardProps} props Props.
 * @returns React component.
 */
export const CircuitStatsCard = ({ circuitId }: CircuitStatsCardProps): ReactElement => {
    const isLoadingStats = useAppSelector(s => s.circuitsState.isLoadingCircuitsStats);
    const stats = useAppSelector(
        s => s.circuitsState.circuitsStats.find(x => x.circuit_id === circuitId),
        deepEqual,
    );

    switch (true) {
        case isLoadingStats && stats === undefined:
            return <Spinner grow />;
        case !stats:
            return <h4>No data.</h4>;
        default:
            return (
                <>
                    <div>
                        <h5>{`Average cost: ${stats!.avg_cost.toFixed(4)} USD`}</h5>
                    </div>
                    <div>
                        <h5>{`Average gen time: ${stats!.avg_eval_time.toFixed(4)} Mins`}</h5>
                    </div>
                    <div>
                        <h5>{`Completed: ${stats!.completed}`}</h5>
                    </div>
                </>
            );
    }
};
