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
 * Hook to manage selected proof id state.
 */
export const useSelectedProofId = (): void => {
    const dispatch = useDispatch();
    const selectedProofId = useAppSelector(selectSelectedProofKey);
    const proofKey = useParams()[RouterParam.proofKey];
    const navigate = useNavigate();

    useEffect(() => {
        if (selectedProofId === proofKey) {
            return;
        }

        if (proofKey !== undefined) {
            dispatch(UpdateSelectedProofKey(proofKey));
            return;
        }

        selectedProofId !== undefined && navigate(`${selectedProofId}`);
    }, [proofKey, dispatch, selectedProofId, navigate]);
};
