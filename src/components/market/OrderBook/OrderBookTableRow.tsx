/**
 * @file React component.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

import { KeyboardEventHandler, ReactElement, useContext } from 'react';
import { Row } from 'react-table';
import { OrderBookTableData } from 'src/models';
import { OrderManagementPanelContext } from '../OrderManagementPanel';

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
        >
            {row.cells.map(cell => {
                const { key, ...rest } = cell.getCellProps();
                return (
                    <td
                        key={key}
                        {...rest}
                    >
                        {cell.render('Cell')}
                    </td>
                );
            })}
        </tr>
    );
};
