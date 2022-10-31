/**
 * @file React hook.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

import { Dispatch, SetStateAction, useState } from 'react';
import { selectPartialProofList, useAppSelector } from 'src/redux';

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

    const proofs = useAppSelector(selectPartialProofList);

    if (selectedProofId === undefined && proofs.length) {
        setSelectedProofId(proofs.at(0)?.id);
    }

    return [selectedProofId, setSelectedProofId];
};
