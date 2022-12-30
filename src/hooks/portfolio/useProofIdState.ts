/**
 * @file React hook.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { dequal as deepEqual } from 'dequal';
import { selectPartialProofList, useAppSelector } from 'src/redux';
import { RouterParam } from 'src/enums';

/**
 * Hook to manage selected proof id state.
 *
 * @returns Proof id state.
 */
export const useProofIdState = (): [
    number | undefined,
    Dispatch<SetStateAction<number | undefined>>,
] => {
    const [selectedProofId, setSelectedProofId] = useState<number>();
    const proofs = useAppSelector(selectPartialProofList, deepEqual);
    const proofId = useParams()[RouterParam.proofId];
    const navigate = useNavigate();

    useEffect(() => {
        if (proofId !== undefined) {
            setSelectedProofId(Number(proofId));
            return;
        }

        if (selectedProofId !== undefined || proofs.length === 0) {
            proofId !== selectedProofId && navigate(`${selectedProofId}`);
            return;
        }

        const { id } = proofs.at(0)!;
        setSelectedProofId(id);
    }, [proofId, setSelectedProofId, selectedProofId, navigate, proofs]);

    return [selectedProofId, setSelectedProofId];
};
