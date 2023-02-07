/**
 * @file React hook.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { selectSelectedProofKey, UpdateSelectedProofKey, useAppSelector } from 'src/redux';
import { RouterParam } from 'src/enums';

/**
 * Hook to manage selected proof key state.
 */
export const useSelectedProofKey = (): void => {
    const dispatch = useDispatch();
    const selectedProofKey = useAppSelector(selectSelectedProofKey);
    const proofKey = useParams()[RouterParam.proofKey];
    const navigate = useNavigate();

    useEffect(() => {
        if (selectedProofKey === proofKey) {
            return;
        }

        if (proofKey !== undefined) {
            dispatch(UpdateSelectedProofKey(proofKey));
            return;
        }

        selectedProofKey !== undefined && navigate(`${selectedProofKey}`);
    }, [proofKey, dispatch, selectedProofKey, navigate]);
};
