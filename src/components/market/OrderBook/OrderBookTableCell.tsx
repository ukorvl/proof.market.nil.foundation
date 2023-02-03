/**
 * @file React component.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

import type { ReactElement } from 'react';
import { Label } from '@nilfoundation/react-components';
import type { Cell } from 'react-table';
import { TCell } from 'src/components';
import { renderDashOnEmptyValue } from 'src/utils';
import type { OrderBookTableData } from 'src/models';

/**
 * Props.
 */
type OrderBookTableCellProps = {
    cell: Cell<OrderBookTableData>;
    userOrdersAmount?: number;
};

/**
 * Order book table cell.
 *
 * @param {OrderBookTableCellProps} props Props.
 * @returns React component.
 */
export const OrderBookTableCell = ({
    cell,
    userOrdersAmount,
}: OrderBookTableCellProps): ReactElement => {
    const { column, value, getCellProps } = cell;

    return (
        <TCell {...getCellProps()}>
            <span>{column.id === 'ordersAmount' ? value : renderDashOnEmptyValue(value)}</span>
            {!!userOrdersAmount && (
                <Label>
                    <span>{userOrdersAmount}</span>
                </Label>
            )}
        </TCell>
    );
};
