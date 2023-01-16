/**
 * @file React component.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

import { ReactElement, memo, ReactNode } from 'react';
import { Icon, Spinner } from '@nilfoundation/react-components';
import { ListChildComponentProps } from 'react-window';
import { TradeHistoryData } from 'src/models';
import { useInfiniteLoadItems } from 'src/hooks';
import { getCompletedTradeOrdersByLimit } from 'src/api';
import { TRow, TCell, Table, THead, TBody, VirtualList, THeader } from 'src/components';
import { formatDate, renderDashOnEmptyValue } from 'src/utils';
import styles from './TradeHistory.module.scss';

/**
 * Table head configuration.
 */
const tradeHistoryTableHeadConfig: Array<Record<'Header', ReactNode>> = [
    {
        Header: (
            <>
                Time <Icon iconName="fa-solid fa-angle-down" />
            </>
        ),
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
 * @returns React component.
 */
export const TradeHistoryTable = memo(function TradeHistoryTable(): ReactElement {
    const { items, loadMoreItems, loading } = useInfiniteLoadItems<TradeHistoryData>({
        fetcher: getCompletedTradeOrdersByLimit,
    });

    const Element = ({ index, style }: ListChildComponentProps<TradeHistoryData>) => {
        const item = items[index];

        if (item === undefined) {
            return <></>;
        }

        const { type, time, cost, eval_time } = item;

        return (
            <TRow
                style={style}
                className={`${type}TextColor`}
            >
                <TCell>{formatDate(time, 'DD.MM HH:mm')}</TCell>
                <TCell>{cost.toFixed(4)}</TCell>
                <TCell>{renderDashOnEmptyValue(eval_time)}</TCell>
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
                {loading && Object.keys(items).length === 0 && <Spinner grow />}
                <VirtualList
                    items={items}
                    loadMoreItems={loadMoreItems}
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
