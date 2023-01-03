/**
 * @file React hook.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { selectCurrentCircuitId, UpdateSelectedCircuitId, useAppSelector } from 'src/redux';
import { RouterParam } from 'src/enums';

/**
 * Hook to manage selected circuit id state.
 */
export const useSelectedCircuitId = (): void => {
    const selectedCircuitId = useAppSelector(selectCurrentCircuitId);
    const circuitId = useParams()[RouterParam.circuitId];
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        const idAsNumber = Number(circuitId);

        if (selectedCircuitId === idAsNumber) {
            return;
        }

        if (circuitId !== undefined) {
            dispatch(UpdateSelectedCircuitId(idAsNumber));
            return;
        }

        selectedCircuitId !== undefined && navigate(`${selectedCircuitId}`);
    }, [circuitId, dispatch, selectedCircuitId, navigate]);
};
