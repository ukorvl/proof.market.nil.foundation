/**
 * @file React component.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

import { CSSProperties, KeyboardEventHandler, ReactElement, useContext } from 'react';
import { Row } from 'react-table';
import { OrderBookTableData } from 'src/models';
import { OrderManagementPanelContext } from '../OrderManagementPanel';
import { OrderBookTableCell } from './OrderBookTableCell';

/**
 * Props.
 */
type OrderBookTableRowProps = {
    row: Row<OrderBookTableData>;
};

/**
 * Order book table row.
 *
 * @param {OrderBookTableRowProps} props Props.
 * @returns React component.
 */
export const OrderBookTableRow = ({ row }: OrderBookTableRowProps): ReactElement => {
    const { setSelectedValues } = useContext(OrderManagementPanelContext);
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
            style={{ '--bar-percent': `value` } as CSSProperties}
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
