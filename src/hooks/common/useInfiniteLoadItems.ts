/**
 * @file React component.
 * @copyright Yury Korotovskikh <u.korotovskiy@nil.foundation>
 */

import { useCallback, useState } from 'react';

const items: Record<string, unknown> = {};
const requestCache: Record<string, boolean> = {};

type UseInfiniteLoadItemsParams<T> = {
    fetcher: () => Promise<T[]>;
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
        (startIndex: number, stopIndex: number) => {
            const key = `${startIndex}:${stopIndex}`;
            if (requestCache[key]) {
                return;
            }

            const visibleRange = [...Array(stopIndex - startIndex).keys()].map(x => x + startIndex);
            const itemsRetreived = visibleRange.every(index => !!items[index]);

            if (itemsRetreived) {
                requestCache[key] = true;
                return;
            }

            return fetcher;
        },
        [fetcher],
    );

    return { items, loading, error, loadMoreItems };
};
