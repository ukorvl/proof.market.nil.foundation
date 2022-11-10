/**
 * @file React component.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

import { ReactElement } from 'react';
import { Label } from '@nilfoundation/react-components';
import { Cell } from 'react-table';
import { OrderBookTableData } from 'src/models';
import { TCell } from 'src/components';

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
    return (
        <TCell {...cell.getCellProps()}>
            {cell.value}
            {!!userOrdersAmount && (
                <Label>
                    <span>{userOrdersAmount}</span>
                </Label>
            )}
        </TCell>
    );
};
