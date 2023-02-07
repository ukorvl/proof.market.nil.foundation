/**
 * @file React component.
 * @copyright Yury Korotovskikh <u.korotovskiy@nil.foundation>
 */

import { useCallback, useState, useEffect } from 'react';
import { getAsks } from 'src/api';
import type { Ask } from 'src/models';

/**
 * Cache of already loaded indexes.
 */
let requestCache: Record<string, boolean> = {};

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
    items: Ask[];
    loading: boolean;
    error: boolean;
    loadMoreItems: (startIndex: number, stopIndex: number) => Promise<void>;
    hasMore: boolean;
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
    const [loadedItemsState, setLoadedItemsState] = useState<{
        hasNextPage: boolean;
        items: Ask[];
    }>({
        hasNextPage: true,
        items: [],
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    useEffect(() => {
        setLoadedItemsState({
            items: [],
            hasNextPage: true,
        });
        requestCache = {};
    }, [selectedCircuitKey]);

    const loadMoreItems = useCallback(
        async (startIndex: number, stopIndex: number) => {
            stopIndex += 1;
            const { items } = loadedItemsState;

            const key = `${startIndex}:${stopIndex}`;
            if (requestCache[key]) {
                return;
            }

            const length = stopIndex - startIndex;
            const visibleRange = [...Array(length).keys()].map(x => x + startIndex);
            const itemsRetreived = visibleRange.every(index => !!items.at(index));

            if (itemsRetreived) {
                requestCache[key] = true;
                return;
            }

            try {
                setLoading(true);
                setError(false);

                const getTradesApiFilter: Partial<Ask> = {
                    statement_key: selectedCircuitKey,
                    status: 'completed',
                };

                const loadedItems = await getAsks(getTradesApiFilter, stopIndex, startIndex);
                setLoading(false);

                setLoadedItemsState({
                    hasNextPage: loadedItems.length >= length,
                    items: [...items].concat(loadedItems),
                });
            } catch {
                setError(true);
                setLoading(false);
            }
        },
        [setError, setLoading, loadedItemsState, selectedCircuitKey],
    );

    return {
        items: loadedItemsState.items,
        loading,
        error,
        loadMoreItems,
        hasMore: loadedItemsState.hasNextPage,
    };
};
