/**
 * @file React hook.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { dequal as deepEqual } from 'dequal';
import {
    selectProofList,
    selectSelectedProofId,
    UpdateSelectedProofId,
    useAppSelector,
} from 'src/redux';
import { RouterParam } from 'src/enums';

/**
 * Hook to manage selected proof id state.
 */
export const useProofIdState = (): void => {
    const dispatch = useDispatch();
    const selectedProofId = useAppSelector(selectSelectedProofId);
    const proofs = useAppSelector(selectProofList, deepEqual);
    const proofId = useParams()[RouterParam.proofId];
    const navigate = useNavigate();

    useEffect(() => {
        if (proofId !== undefined) {
            dispatch(UpdateSelectedProofId(Number(proofId)));
            return;
        }

        if (selectedProofId !== undefined || proofs.length === 0) {
            proofId !== selectedProofId && navigate(`${selectedProofId}`);
            return;
        }

        const { id } = proofs.at(0)!;
        dispatch(UpdateSelectedProofId(id));
    }, [proofId, dispatch, selectedProofId, navigate, proofs]);
};
