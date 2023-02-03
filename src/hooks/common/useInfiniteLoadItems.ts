/**
 * @file React component.
 * @copyright Yury Korotovskikh <u.korotovskiy@nil.foundation>
 */

import { useCallback, useState } from 'react';

const items: Record<string, unknown> = {};
const requestCache: Record<string, boolean> = {};

/**
 * Hook parameters type.
 */
type UseInfiniteLoadItemsParams<T> = {
    fetcher: (length: number, start: number, ...args: never[]) => Promise<T[]>;
};

/**
 * Hook return type.
 */
type UseInfiniteLoadItemsReturnType<T> = {
    hasNextPage: boolean;
    items: Record<string, T>;
    loading: boolean;
    error: boolean;
    loadMoreItems: (startIndex: number, stopIndex: number) => Promise<void>;
};

/**
 * Hook to manage infinite loading items.
 *
 * @param {UseInfiniteLoadItemsParams} params Params.
 * @returns .
 */
export const useInfiniteLoadItems = <T>({ fetcher }: UseInfiniteLoadItemsParams<T>) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    const loadMoreItems = useCallback(
        async (startIndex: number, stopIndex: number) => {
            stopIndex = stopIndex + 10;

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

                const loadedItems = await fetcher(length, startIndex);
                setLoading(false);

                loadedItems.forEach((item, index) => {
                    items[index + startIndex] = item;
                });
            } catch {
                setError(true);
                setLoading(false);
            }
        },
        [fetcher, setError, setLoading],
    );

    return {
        items,
        loading,
        error,
        loadMoreItems,
    } as UseInfiniteLoadItemsReturnType<T>;
};
