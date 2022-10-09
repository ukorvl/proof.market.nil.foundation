/**
 * @file React component.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

import { ReactElement } from 'react';
import { ListGroup, Spinner } from '@nilfoundation/react-components';
import { useSelector } from 'react-redux';
import { CurcuitsListItem } from './CurcuitsListItem';
import { DashboardCard } from '../DashboardCard';
import { Details } from '../../common';
import { selectCircuits } from '../../../redux/market/selectors';
import { RootStateType } from '../../../redux';
import './CurcuitsList.scss';

/**
 * Currencies list.
 *
 * @returns React component.
 */
export const CurcuitsList = (): ReactElement => {
    const circuitsList = useSelector(selectCircuits);
    const loadingCircuits = useSelector((s: RootStateType) => s.circuitsState.isLoading);

    return (
        <DashboardCard>
            <Details title={<h4>Curcuits list</h4>}>
                {loadingCircuits && !circuitsList.length ? (
                    <Spinner grow />
                ) : (
                    <ListGroup className="currenciesList">
                        {circuitsList.map(x => (
                            <CurcuitsListItem
                                key={x.id}
                                circuit={x}
                            />
                        ))}
                    </ListGroup>
                )}
            </Details>
        </DashboardCard>
    );
};
