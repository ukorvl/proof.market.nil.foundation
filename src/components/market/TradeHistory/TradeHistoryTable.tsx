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
import type { Ask, TradeHistoryData } from 'src/models';
import { useInfiniteLoadItems } from 'src/hooks';
import { getAsks } from 'src/api';
import styles from './TradeHistory.module.scss';

/**
 * Props.
 */
type TradeHistoryTableProps = {
    selctedCircuitKey: string;
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
    selctedCircuitKey,
}: TradeHistoryTableProps): ReactElement {
    const { items, loadMoreItems, loading, error } = useInfiniteLoadItems<Ask>({
        fetcher: (length, start) =>
            getAsks({ statement_key: selctedCircuitKey, status: 'completed' }, length, start),
    });

    // const itemsLength = Object.keys(items).length;
    // const isItemLoaded = (index: number) => !hasNextPage || index < itemsLength;
    // const itemCount = hasNextPage ? itemsLength + 1 : itemsLength;

    const isItemLoaded = (index: number) => !!items[index];

    const Element = ({ index, style }: ListChildComponentProps<TradeHistoryData>) => {
        if (!isItemLoaded(index)) {
            return <Spinner grow />;
        }

        const { cost, generation_time, matched_time } = items[index];

        return (
            <div
                style={style}
                className={`TextColor`}
                role="row"
            >
                <TCell>{formatDate(matched_time!, 'DD.MM HH:mm')}</TCell>
                <TCell>{cost.toFixed(4)}</TCell>
                <TCell>{renderDashOnEmptyValue(generation_time)}</TCell>
            </div>
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
                {error && Object.keys(items).length === 0 && (
                    <h5>Error while getting trades data.</h5>
                )}
                <VirtualList
                    isItemLoaded={isItemLoaded}
                    itemCount={1000}
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
