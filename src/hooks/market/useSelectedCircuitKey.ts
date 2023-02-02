/**
 * @file React hook.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { selectCurrentCircuitKey, UpdateSelectedCircuitKey, useAppSelector } from 'src/redux';
import { RouterParam } from 'src/enums';

/**
 * Hook to manage selected circuit id state.
 */
export const useSelectedCircuitKey = (): void => {
    const selectedCircuitKey = useAppSelector(selectCurrentCircuitKey);
    const circuitId = useParams()[RouterParam.statementId];
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        if (selectedCircuitKey === circuitId) {
            return;
        }

        if (circuitId !== undefined) {
            dispatch(UpdateSelectedCircuitKey(circuitId));
            return;
        }

        selectedCircuitKey !== undefined && navigate(`${selectedCircuitKey}`);
    }, [circuitId, dispatch, selectedCircuitKey, navigate]);
};
