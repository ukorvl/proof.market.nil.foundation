/**
 * @file React component.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

import { ReactElement, useContext } from 'react';
import { Button, Icon, Size } from '@nilfoundation/react-components';
import { Cell } from 'react-table';
import { TCell } from 'src/components';
import { ManageOrdersData } from 'src/models';
import { ManageOrdersPanelContext } from './ManageOrdersPanelContext';

type RemoveOrderCellProps = {
    cell: Cell<ManageOrdersData>;
};

/**
 * Remove order cell.
 *
 * @param {RemoveOrderCellProps} props Props.
 * @returns React component.
 */
export const RemoveOrderCell = ({ cell }: RemoveOrderCellProps): ReactElement => {
    const { setSelectedRow, processing } = useContext(ManageOrdersPanelContext);

    return (
        <TCell {...cell.getCellProps()}>
            <Button
                className="removeButton"
                onClick={() => setSelectedRow(cell.row)}
                disabled={processing}
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
