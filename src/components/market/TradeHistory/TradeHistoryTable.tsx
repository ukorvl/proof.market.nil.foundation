/**
 * @file React component.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

import { ReactElement, memo, ReactNode } from 'react';
import { Spinner } from '@nilfoundation/react-components';
import { ListChildComponentProps } from 'react-window';
import { TradeHistoryData } from 'src/models';
import { useInfiniteLoadItems } from 'src/hooks';
import { getCompletedAsksByLimit } from 'src/api';
import { TRow, TCell, Table, THead, TBody, VirtualList, THeader } from 'src/components';
import { formatDate, renderDashOnEmptyValue } from 'src/utils';
import styles from './TradeHistory.module.scss';

/**
 * Props.
 */
type TradeHistoryTableProps = {
    selctedCircuitId: number;
};

/**
 * Table head configuration.
 */
const tradeHistoryTableHeadConfig: Array<Record<'Header', ReactNode>> = [
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
    selctedCircuitId,
}: TradeHistoryTableProps): ReactElement {
    const { items, loadMoreItems, loading, hasNextPage, error } =
        useInfiniteLoadItems<TradeHistoryData>({
            fetcher: (length, start) => getCompletedAsksByLimit(length, start, selctedCircuitId),
        });

    // const itemsLength = Object.keys(items).length;
    // const isItemLoaded = (index: number) => !hasNextPage || index < itemsLength;
    // const itemCount = hasNextPage ? itemsLength + 1 : itemsLength;

    const isItemLoaded = (index: number) => !!items[index];

    console.log(items);

    const Element = ({ index, style }: ListChildComponentProps<TradeHistoryData>) => {
        if (!isItemLoaded(index)) {
            return <Spinner grow />;
        }

        const { type, time, cost, eval_time } = items[index];

        return (
            <div
                style={style}
                className={`${type}TextColor`}
                role="row"
            >
                <TCell>{formatDate(time, 'DD.MM HH:mm')}</TCell>
                <TCell>{cost.toFixed(4)}</TCell>
                <TCell>{renderDashOnEmptyValue(eval_time)}</TCell>
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
