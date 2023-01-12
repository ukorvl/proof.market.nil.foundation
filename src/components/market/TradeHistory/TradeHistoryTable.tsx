/**
 * @file React component.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

import { ReactElement, memo, ReactNode } from 'react';
import { ListChildComponentProps } from 'react-window';
import { TradeHistoryData, TradeHistoryTableColumn } from 'src/models';
import { ReactTable, TRow, TCell, Table, THead, TBody, VirtualList, THeader } from 'src/components';
import { renderDashOnEmptyValue } from 'src/utils';
import styles from './TradeHistory.module.scss';
import { Icon } from '@nilfoundation/react-components';

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
    const Element = ({ index, style }) => {
        let content;
        if (!isItemLoaded(index)) {
            content = 'Loading...';
        } else {
            content = items[index].name;
        }

        return <TRow style={style}>{content}</TRow>;
    };

    return (
        <Table>
            <THead sticky>
                <TRow>
                    {tradeHistoryTableHeadConfig.map(({ Header }, i) => (
                        <THeader key={i}>{Header}</THeader>
                    ))}
                </TRow>
            </THead>
            <TBody>
                <VirtualList>{Element}</VirtualList>
            </TBody>
        </Table>
    );
});

/**
 * Generate className to table cell.
 *
 * @param row Row.
 * @returns Class name.
 */
const getCellClassName = () => {
    if (row.values.type === undefined) {
        return undefined;
    }

    return `${row.values.type}TextColor`;
};
