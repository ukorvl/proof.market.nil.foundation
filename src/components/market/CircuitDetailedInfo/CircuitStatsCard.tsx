/**
 * @file React component.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

import { ReactElement, useMemo } from 'react';
import { dequal as deepEqual } from 'dequal';
import { Spinner } from '@nilfoundation/react-components';
import { useAppSelector } from 'src/redux';
import { ObjectAsPlainTextViewer } from 'src/components';
import { Circuit } from 'src/models';

/**
 * Props.
 */
type CircuitStatsCardProps = {
    circuitId: Circuit['_key'];
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
        s => s.circuitsState.circuitsStats.find(x => x._key === circuitId),
        deepEqual,
    );

    const statsData = useMemo(() => {
        return stats === undefined
            ? {}
            : {
                  'Average cost': `${stats.avg_cost?.toFixed(4)} USD`,
                  'Average gen time': `${stats.avg_eval_time?.toFixed(4)} Mins`,
                  Completed: stats.completed,
              };
    }, [stats]);

    switch (true) {
        case isLoadingStats && stats === undefined:
            return <Spinner grow />;
        case !stats:
            return <h4>No data.</h4>;
        default:
            return <ObjectAsPlainTextViewer data={statsData} />;
    }
};
