/**
 * @file React component.
 * @copyright Yury Korotovskikh <u.korotovskiy@nil.foundation>
 */

import { ReactElement } from 'react';
import { FixedSizeList as List, FixedSizeListProps } from 'react-window';
import InfiniteLoader from 'react-window-infinite-loader';

/**
 * Props.
 */
type VirtualListProps<T> = {
    items: Record<string, T>;
    loadMoreItems: (startIndex: number, stopIndex: number) => Promise<void> | void;
} & Pick<FixedSizeListProps, 'itemSize' | 'className' | 'children' | 'height' | 'itemCount'>;

/**
 * Vertical virtual list.
 *
 * @param {VirtualListProps} props Props.
 * @returns React component.
 */
export const VirtualList = <T,>({
    items,
    children,
    loadMoreItems,
    itemCount,
    ...rest
}: VirtualListProps<T>): ReactElement => {
    const isItemLoaded = (index: number) => !!items[index];

    return (
        <InfiniteLoader
            loadMoreItems={loadMoreItems}
            itemCount={itemCount}
            isItemLoaded={isItemLoaded}
        >
            {({ onItemsRendered, ref }) => (
                <List
                    itemCount={itemCount}
                    onItemsRendered={onItemsRendered}
                    ref={ref}
                    width="100%"
                    {...rest}
                >
                    {children}
                </List>
            )}
        </InfiniteLoader>
    );
};
