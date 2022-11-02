/**
 * @file React component.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

import { ReactElement } from 'react';
import { ListGroup, Media } from '@nilfoundation/react-components';
import { useDispatch, useSelector } from 'react-redux';
import { UpdateSelectedCircuitId, selectCurrentCircuit } from 'src/redux';
import { Circuit } from 'src/models';
import { CircuitsListItemInfo } from './CircuitsListItemInfo';

/**
 * Props.
 */
type CurcuitsListItemProps = {
    circuit: Circuit;
};

/**
 * Currencies list item.
 *
 * @param {CurcuitsListItemProps} props - Props.
 * @returns React component.
 */
export const CurcuitsListItem = ({
    circuit: { id, name, info },
}: CurcuitsListItemProps): ReactElement => {
    const dispatch = useDispatch();
    const selectedItem = useSelector(selectCurrentCircuit, (prev, next) => prev?.id === next?.id);
    const isSelected = id === selectedItem?.id;

    const onSelectItem = () => {
        dispatch(UpdateSelectedCircuitId(id));
    };

    return (
        <ListGroup.Item
            active={isSelected}
            onClick={onSelectItem}
        >
            <Media>
                <Media.Body>{`${name.toUpperCase()} (${info.toUpperCase()})/USD`}</Media.Body>
                <CircuitsListItemInfo
                    id={id}
                    isSelected={isSelected}
                />
            </Media>
        </ListGroup.Item>
    );
};
