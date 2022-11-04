/**
 * @file React component.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

import { ReactElement, memo, useCallback } from 'react';
import { Row, TableState } from 'react-table';
import { TradeHistoryData, TradeHistoryTableColumn } from 'src/models';
import { ReactTable } from 'src/components';

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
        (rows: Row<TradeHistoryData>[], prepareRow: (row: Row<TradeHistoryData>) => void) =>
            rows.map(row => {
                prepareRow(row);
                return (
                    <tr
                        {...row.getRowProps()}
                        key={row.id}
                    >
                        {row.cells.map(cell => {
                            const { key, ...rest } = cell.getCellProps();

                            return (
                                <td
                                    className={getCellClassName(row)}
                                    key={key}
                                    {...rest}
                                >
                                    {cell.render('Cell')}
                                </td>
                            );
                        })}
                    </tr>
                );
            }),
        [],
    );

    return (
        <ReactTable
            name="tradeHistoryTable"
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
