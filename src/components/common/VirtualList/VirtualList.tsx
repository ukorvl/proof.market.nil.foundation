/**
 * @file React component.
 * @copyright Yury Korotovskikh <u.korotovskiy@nil.foundation>
 */

import type { ReactElement } from 'react';
import type { FixedSizeListProps } from 'react-window';
import { FixedSizeList as List } from 'react-window';
import InfiniteLoader from 'react-window-infinite-loader';

/**
 * Props.
 */
type VirtualListProps = {
    isItemLoaded: (i: number) => boolean;
    loadMoreItems: (startIndex: number, stopIndex: number) => Promise<void> | void;
} & Pick<FixedSizeListProps, 'itemSize' | 'className' | 'children' | 'height' | 'itemCount'>;

/**
 * Vertical virtual list.
 *
 * @param {VirtualListProps} props Props.
 * @returns React component.
 */
export const VirtualList = ({
    isItemLoaded,
    children,
    loadMoreItems,
    itemCount,
    ...rest
}: VirtualListProps): ReactElement => {
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
