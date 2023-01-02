/**
 * @file React component.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

import { ReactElement, useEffect } from 'react';
import { Spinner } from '@nilfoundation/react-components';
import { dequal as deepEqual } from 'dequal';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { RouterParam } from 'src/enums';
import {
    selectCircuits,
    selectCurrentCircuitId,
    UpdateSelectedCircuitId,
    useAppSelector,
} from 'src/redux';
import { CircuitsListTable } from './CircuitsListTable';
import { DashboardCard } from '../../common';
import styles from './CircuitsList.module.scss';

/**
 * Currencies list.
 *
 * @returns React component.
 */
export const CircuitsList = (): ReactElement => {
    const circuitsList = useAppSelector(selectCircuits, deepEqual);
    const loadingCircuits = useAppSelector(s => s.circuitsState.isLoading);
    const selectedCircuitId = useAppSelector(selectCurrentCircuitId);
    const circuitId = useParams()[RouterParam.circuitId];
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        if (selectedCircuitId === circuitId) {
            return;
        }

        if (circuitId !== undefined && Number(circuitId) !== selectedCircuitId) {
            dispatch(UpdateSelectedCircuitId(Number(circuitId)));
            return;
        }

        navigate(`${selectedCircuitId}`);
    }, [circuitId, dispatch, selectedCircuitId, navigate]);

    return (
        <DashboardCard>
            <h4>Circuit list</h4>
            <div className={styles.container}>
                {loadingCircuits && !circuitsList.length ? (
                    <Spinner grow />
                ) : (
                    <CircuitsListTable circuitsList={circuitsList} />
                )}
            </div>
        </DashboardCard>
    );
};
