/**
 * @file React component.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

import { ReactElement } from 'react';
import { ListGroup, Spinner } from '@nilfoundation/react-components';
import { selectCircuits, useAppSelector } from 'src/redux';
import { CurcuitsListItem } from './CircuitsListItem';
import { Details, DashboardCard } from '../../common';
import './CircuitsList.scss';

/**
 * Currencies list.
 *
 * @returns React component.
 */
export const CircuitsList = (): ReactElement => {
    const circuitsList = useAppSelector(selectCircuits);
    const loadingCircuits = useAppSelector(s => s.circuitsState.isLoading);

    return (
        <DashboardCard>
            <Details title={<h4>Circuit list</h4>}>
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
