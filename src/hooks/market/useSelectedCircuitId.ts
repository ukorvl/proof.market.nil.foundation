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
        if (selectedCircuitId === Number(circuitId)) {
            return;
        }

        if (circuitId !== undefined) {
            dispatch(UpdateSelectedCircuitId(Number(circuitId)));
            return;
        }

        navigate(`${selectedCircuitId}`);
    }, [circuitId, dispatch, selectedCircuitId, navigate]);
};
