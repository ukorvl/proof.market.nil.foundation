/**
 * @file React component.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

import { ReactElement, memo, useCallback } from 'react';
import { Row, TableInstance, TableState } from 'react-table';
import { TradeHistoryData, TradeHistoryTableColumn } from 'src/models';
import { ReactTable, TRow, TCell } from 'src/components';

/**
 * Props.
 */
type TradeHistoryTableProps = {
    columns: TradeHistoryTableColumn[];
    data: TradeHistoryData[];
};

/**
 * Initial table state without user interactions.
 */
const defaultTableState: Partial<TableState<TradeHistoryData>> = {
    sortBy: [
        {
            id: 'timestamp',
            desc: true,
        },
    ],
    hiddenColumns: ['type'],
};

/**
 * Order book table.
 *
 * @param {TradeHistoryTableProps} props Props.
 * @returns React component.
 */
export const TradeHistoryTable = memo(function TradeHistoryTable({
    columns,
    data,
}: TradeHistoryTableProps): ReactElement {
    const renderRows = useCallback(
        ({ rows, prepareRow }: TableInstance<TradeHistoryData>) =>
            rows.map(row => {
                prepareRow(row);
                return (
                    <TRow
                        {...row.getRowProps()}
                        key={row.id}
                    >
                        {row.cells.map(cell => {
                            const { value, column, getCellProps } = cell;
                            const { key, ...rest } = getCellProps();

                            return (
                                <TCell
                                    className={getCellClassName(row)}
                                    key={key}
                                    {...rest}
                                >
                                    {column.id !== 'timestamp' ? value.toFixed(4) : value}
                                </TCell>
                            );
                        })}
                    </TRow>
                );
            }),
        [],
    );

    return (
        <ReactTable
            name="tradeHistoryTable"
            className="tradeHistoryTable"
            data={data}
            columns={columns}
            renderRows={renderRows}
            initialState={defaultTableState}
        />
    );
});

/**
 * Generate className to table cell.
 *
 * @param row Row.
 * @returns Class name.
 */
const getCellClassName = (row: Row<TradeHistoryData>) => {
    if (row.values.type === undefined) {
        return undefined;
    }

    return `${row.values.type}TextColor`;
};
