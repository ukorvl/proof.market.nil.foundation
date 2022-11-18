/**
 * @file React component.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

import { ReactElement } from 'react';
import { Spinner } from '@nilfoundation/react-components';
import { dequal as deepEqual } from 'dequal';
import { selectCircuits, useAppSelector } from 'src/redux';
import { CircuitsListTable } from './CircuitsListTable';
import { Details, DashboardCard } from '../../common';
import './CircuitsList.scss';

/**
 * Currencies list.
 *
 * @returns React component.
 */
export const CircuitsList = (): ReactElement => {
    const circuitsList = useAppSelector(selectCircuits, deepEqual);
    const loadingCircuits = useAppSelector(s => s.circuitsState.isLoading);

    return (
        <DashboardCard>
            <Details title={<h4>Circuit list</h4>}>
                <div className="circuitsList">
                    {loadingCircuits && !circuitsList.length ? (
                        <Spinner grow />
                    ) : (
                        <CircuitsListTable circuitsList={circuitsList} />
                    )}
                </div>
            </Details>
        </DashboardCard>
    );
};
