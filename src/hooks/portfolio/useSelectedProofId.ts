/**
 * @file React hook.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { selectSelectedProofId, UpdateSelectedProofId, useAppSelector } from 'src/redux';
import { RouterParam } from 'src/enums';

/**
 * Hook to manage selected proof id state.
 */
export const useSelectedProofId = (): void => {
    const dispatch = useDispatch();
    const selectedProofId = useAppSelector(selectSelectedProofId);
    const proofId = useParams()[RouterParam.proofId];
    const navigate = useNavigate();

    useEffect(() => {
        const idAsNumber = Number(proofId);

        if (selectedProofId === idAsNumber) {
            return;
        }

        if (proofId !== undefined) {
            dispatch(UpdateSelectedProofId(idAsNumber));
            return;
        }

        selectedProofId !== undefined && navigate(`${selectedProofId}`);
    }, [proofId, dispatch, selectedProofId, navigate]);
};
