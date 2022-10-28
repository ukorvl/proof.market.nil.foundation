/**
 * @file React hook.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Ask } from 'src/models';
import { selectAsksList } from 'src/redux';
import { isPreviousDay } from 'src/utils';

/**
 * Return type.
 */
type UseGetCircuitBriefInfo = {
    currentPrice?: number;
    dailyChange?: number;
};

/**
 * Hook to get circuit brief info.
 *
 * @param circuitId Circuit id.
 * @returns Brief info.
 */
export const useGetCircuitBriefInfo = (circuitId?: string): UseGetCircuitBriefInfo => {
    const [currentPrice, setCurrentPrice] = useState<number>();
    const [dailyChange, setDailyChange] = useState<number>();

    const allAsks = useSelector(selectAsksList);

    useEffect(() => {
        const filteredAsks = allAsks.filter(
            x => x.status === 'completed' && x.circuit_id === circuitId,
        );
        const currentPrice = filteredAsks.at(-1)?.cost;
        setCurrentPrice(currentPrice);

        const costToCompare = findCostToCompare(filteredAsks);
        setDailyChange(countDailyChange(costToCompare, currentPrice));
    }, [allAsks, circuitId]);

    return { currentPrice, dailyChange };
};

/**
 * Find cost to compare with current cost to check grow/loss.
 * Returns previous trade day close cost if it exists or first
 * ask in current day cost or undefined if there are none of them.
 *
 * @param asks - Asks array.
 * @returns Cost to compare.
 */
const findCostToCompare = (asks: Ask[]) => {
    if (asks.length < 2) {
        return undefined;
    }

    // reverse for loop is less expensive than Array.reverse().forEach()
    for (let i = asks.length - 1; i >= 0; i--) {
        const current = asks.at(i);
        const next = asks.at(i - 1);

        if (!next || !current) {
            return undefined;
        }

        if (isPreviousDay(current.timestamp!, next.timestamp!)) {
            return next.cost;
        }
    }

    return asks.at(0)?.cost;
};

/**
 * Counts difference between prev and next cost in percentage.
 *
 * @param prevCost Prev cost.
 * @param nextCost Next cons.
 * @returns Difference between prev and next cost.
 */
const countDailyChange = (prevCost?: number, nextCost?: number) => {
    if (prevCost === undefined || nextCost === undefined) {
        return undefined;
    }

    return ((nextCost - prevCost) / prevCost) * 100;
};
