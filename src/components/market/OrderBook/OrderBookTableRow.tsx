/**
 * @file React component.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

import { CSSProperties, KeyboardEventHandler, ReactElement, useContext } from 'react';
import { Row } from 'react-table';
import { OrderBookTableData } from 'src/models';
import { OrderManagementContext } from '../OrderManagementContextProvider';
import { OrderBookTableCell } from './OrderBookTableCell';

/**
 * Props.
 */
type OrderBookTableRowProps = {
    row: Row<OrderBookTableData>;
    maxValue?: number;
};

/**
 * Order book table row.
 *
 * @param {OrderBookTableRowProps} props Props.
 * @returns React component.
 */
export const OrderBookTableRow = ({ row, maxValue = 50 }: OrderBookTableRowProps): ReactElement => {
    const { setSelectedValues } = useContext(OrderManagementContext);
    const percentOfMaxValue = maxValue;
    const onClickRow = () => {
        setSelectedValues({
            cost: row.values.cost,
            eval_time: row.values.eval_time,
        });
    };

    const onKeyDownHandler: KeyboardEventHandler = e => {
        if (e.key !== 'Enter' && e.key !== ' ') {
            return;
        }

        e.preventDefault();
        onClickRow();
    };

    return (
        <tr
            {...row.getRowProps()}
            onClick={onClickRow}
            onKeyDown={onKeyDownHandler}
            tabIndex={0}
            style={{ '--bar-width': `${percentOfMaxValue}%` } as CSSProperties}
        >
            {row.cells.map(cell => {
                const { key } = cell.getCellProps();
                return (
                    <OrderBookTableCell
                        key={key}
                        cell={cell}
                    />
                );
            })}
        </tr>
    );
};
