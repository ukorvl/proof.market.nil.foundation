/**
 * @file React component.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

import { ReactElement } from 'react';
import { ListGroup } from '@nilfoundation/react-components';
import { useSelector } from 'react-redux';
import { CurcuitsListItem } from './CurcuitsListItem';
import { DashboardCard } from '../DashboardCard';
import { selectCircuits } from '../../../redux/market/selectors';
import './CurcuitsList.scss';

/**
 * Currencies list.
 *
 * @returns React component.
 */
export const CurcuitsList = (): ReactElement => {
    const circuitsList = useSelector(selectCircuits);

    return (
        <DashboardCard>
            <h4>Curcuits list</h4>
            <ListGroup className="currenciesList">
                {circuitsList.map(x => (
                    <CurcuitsListItem
                        key={x.id}
                        circuit={x}
                    />
                ))}
            </ListGroup>
        </DashboardCard>
    );
};
