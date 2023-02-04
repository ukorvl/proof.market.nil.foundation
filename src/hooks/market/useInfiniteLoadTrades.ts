/**
 * @file React component.
 * @copyright Yury Korotovskikh <u.korotovskiy@nil.foundation>
 */

import { useCallback, useEffect, useState } from 'react';
import { getAsks } from 'src/api';
import type { Ask } from 'src/models';

/**
 * Cache of already loaded indexes.
 */
const requestCache: Record<string, boolean> = {};

/**
 * Hook parameters type.
 */
type UseInfiniteLoadItemsParams = {
    selectedCircuitKey: string;
};

/**
 * Hook return type.
 */
type UseInfiniteLoadItemsReturnType = {
    items: Record<string, Ask>;
    loading: boolean;
    error: boolean;
    loadMoreItems: (startIndex: number, stopIndex: number) => Promise<void>;
};

/**
 * Hook to manage infinite loading trades.
 *
 * @param {UseInfiniteLoadItemsParams} params Params.
 * @returns .
 */
export const useInfiniteLoadTrades = ({
    selectedCircuitKey,
}: UseInfiniteLoadItemsParams): UseInfiniteLoadItemsReturnType => {
    const [items, setItems] = useState<Record<string, Ask>>({});
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    // useEffect(() => {
    //     setItems({});
    // }, [selectedCircuitKey]);

    const loadMoreItems = useCallback(
        async (startIndex: number, stopIndex: number) => {
            const key = `${startIndex}:${stopIndex}`;
            if (requestCache[key]) {
                return;
            }

            const length = stopIndex - startIndex;
            const visibleRange = [...Array(length).keys()].map(x => x + startIndex);
            const itemsRetreived = visibleRange.every(index => !!items[index]);

            if (itemsRetreived) {
                requestCache[key] = true;
                return;
            }

            try {
                setLoading(true);

                const getTradesFilter: Partial<Ask> = {
                    statement_key: selectedCircuitKey,
                    status: 'completed',
                };
                const loadedItems = await getAsks(getTradesFilter, stopIndex, startIndex);
                setLoading(false);

                loadedItems.forEach((item, index) => {
                    items[index + startIndex] = item;
                });
            } catch {
                setError(true);
                setLoading(false);
            }
        },
        [setError, setLoading, items, selectedCircuitKey],
    );

    return {
        items,
        loading,
        error,
        loadMoreItems,
    };
};
