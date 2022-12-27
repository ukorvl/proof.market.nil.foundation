/**
 * @file React component.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

import { ReactElement } from 'react';
import { ListGroup, Media } from '@nilfoundation/react-components';
import { useDispatch, useSelector } from 'react-redux';
import { UpdateSelectedCircuitId, selectCurrentCircuit } from 'src/redux';
import { CircuitsListData } from 'src/models';
import { CircuitsListItemInfo } from './CircuitsListItemInfo';
import styles from './CircuitsList.module.scss';

/**
 * Props.
 */
type CurcuitsListItemProps = {
    data: CircuitsListData;
};

/**
 * Currencies list item.
 *
 * @param {CurcuitsListItemProps} props - Props.
 * @returns React component.
 */
export const CurcuitsListItem = ({
    data: { id, cost, change, name },
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
                <Media.Body className={styles.itemBody}>{name}</Media.Body>
                <CircuitsListItemInfo
                    cost={cost}
                    change={change}
                    isSelected={isSelected}
                />
            </Media>
        </ListGroup.Item>
    );
};
