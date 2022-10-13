/**
 * @file React hook.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

import { useMemo } from 'react';
import { LineData } from 'lightweight-charts';
import { useAppSelector } from 'src/redux';
import { Proposal } from 'src/models';

/**
 * Hook return type.
 */
type UseGetCircuitDashboardDataReturnType = {
    data?: LineData[];
    loadingData: boolean;
};

/**
 * Get data to draw circuit chart.
 *
 * @returns Data to draw circuit chart.
 */
export const useGetCircuitDashboardData = (): UseGetCircuitDashboardDataReturnType => {
    const loadingData = useAppSelector(s => s.circuitsState.isLoading);
    const proposals = useAppSelector(s => s.proposalsState.proposals);
    const data = useMemo(
        () => (proposals.length ? proposals.map(mapProposalToLineData) : undefined),
        [proposals],
    );

    return { data, loadingData };
};

const mapProposalToLineData = (proposal: Proposal): LineData => ({
    time: new Date().toDateString(),
    value: proposal.eval_time,
});
