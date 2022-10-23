/**
 * @file React component.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

import { ReactElement, useContext } from 'react';
import { uniqueId } from '@nilfoundation/react-components';
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

    return (
        <tr
            {...row.getRowProps()}
            onClick={onClickRow}
            onKeyDown={onClickRow}
            tabIndex={0}
        >
            {row.cells.map(cell => {
                return (
                    <td
                        {...cell.getCellProps()}
                        key={cell.value ?? uniqueId('cell')}
                    >
                        {cell.render('Cell')}
                    </td>
                );
            })}
        </tr>
    );
};
