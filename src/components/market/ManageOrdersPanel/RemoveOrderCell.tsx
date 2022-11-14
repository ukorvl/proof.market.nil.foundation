/**
 * @file React component.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

import { ReactElement } from 'react';
import { Button, Icon, Size } from '@nilfoundation/react-components';
import { Cell, Row } from 'react-table';
import { TCell } from 'src/components';
import { ManageOrdersData } from 'src/models';

type RemoveOrderCellProps = {
    cell: Cell<ManageOrdersData>;
    disabled: boolean;
    setSelectedRow: (r: Row<ManageOrdersData>) => void;
};

/**
 * Remove order cell.
 *
 * @param {RemoveOrderCellProps} props Props.
 * @returns React component.
 */
export const RemoveOrderCell = ({
    cell,
    disabled,
    setSelectedRow,
}: RemoveOrderCellProps): ReactElement => {
    return (
        <TCell {...cell.getCellProps()}>
            <Button
                className="removeButton"
                onClick={() => setSelectedRow(cell.row)}
                disabled={disabled}
                size={Size.xs}
            >
                <Icon
                    tabIndex={0}
                    iconName="fa-solid fa-ban"
                />
            </Button>
        </TCell>
    );
};
