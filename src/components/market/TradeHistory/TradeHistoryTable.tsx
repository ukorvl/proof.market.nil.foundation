/**
 * @file React component.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

import type { ReactElement } from 'react';
import { memo } from 'react';
import { Spinner } from '@nilfoundation/react-components';
import type { ListChildComponentProps } from 'react-window';
import { Table, TRow, TCell, THead, THeader, TBody, VirtualList } from 'src/components';
import { formatDate, renderDashOnEmptyValue } from 'src/utils';
import type { Ask } from 'src/models';
import { useInfiniteLoadTrades } from 'src/hooks';
import styles from './TradeHistory.module.scss';

/**
 * Props.
 */
type TradeHistoryTableProps = {
    selectedCircuitKey: string;
};

/**
 * Table head configuration.
 */
const tradeHistoryTableHeadConfig: Array<Record<'Header', string>> = [
    {
        Header: 'Time',
    },
    {
        Header: 'Cost',
    },
    {
        Header: 'Generation time',
    },
];

/**
 * Trades table.
 *
 * @param {TradeHistoryTableProps} props Props.
 * @returns React component.
 */
export const TradeHistoryTable = memo(function TradeHistoryTable({
    selectedCircuitKey,
}: TradeHistoryTableProps): ReactElement {
    const { items, loadMoreItems, loading, error, hasMore } = useInfiniteLoadTrades({
        selectedCircuitKey,
    });

    const isItemLoaded = (index: number) => !hasMore || !!items.at(index);
    const itemCount = hasMore ? items.length + 1 : items.length;

    const Element = ({ index, style }: ListChildComponentProps<Ask>) => {
        if (!isItemLoaded(index)) {
            return (
                <TRow style={style}>
                    <Spinner grow />
                </TRow>
            );
        }

        const currentItem = items.at(index)!;
        const { cost, generation_time, matched_time } = currentItem;
        const nextItem = items.at(index + 1);

        const className = nextItem ? getRowClass(nextItem, currentItem) : '';

        return (
            <TRow
                style={style}
                className={className}
                role="row"
            >
                <TCell>{formatDate(matched_time!, 'DD.MM HH:mm')}</TCell>
                <TCell>{cost.toFixed(4)}</TCell>
                <TCell>{renderDashOnEmptyValue(generation_time)}</TCell>
            </TRow>
        );
    };

    return (
        <Table className={styles.table}>
            <THead sticky>
                <TRow>
                    {tradeHistoryTableHeadConfig.map(({ Header }, i) => (
                        <THeader key={i}>{Header}</THeader>
                    ))}
                </TRow>
            </THead>
            <TBody>
                {error && items.length === 0 && <h5>Error while getting trades data.</h5>}
                {!loading && !error && items.length === 0 && <h5>Empty data.</h5>}
                <VirtualList
                    isItemLoaded={isItemLoaded}
                    itemCount={itemCount}
                    // eslint-disable-next-line @typescript-eslint/no-empty-function
                    loadMoreItems={loading ? () => {} : loadMoreItems}
                    height={376}
                    itemSize={28}
                    className={styles.virtualList}
                >
                    {Element}
                </VirtualList>
            </TBody>
        </Table>
    );
});

/**
 * Returns classname for row.
 *
 * @param prevItem Previous item.
 * @param currentItem CurrentItem.
 * @returns ClassName.
 */
const getRowClass = (prevItem: Ask, currentItem: Ask): string => {
    if (prevItem.cost > currentItem.cost) {
        return 'lossTextColor';
    }

    if (prevItem.cost < currentItem.cost) {
        return 'growTextColor';
    }

    return '';
};
