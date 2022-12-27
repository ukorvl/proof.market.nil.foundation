/**
 * @file React component.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

import { ReactElement, useContext } from 'react';
import { Spinner } from '@nilfoundation/react-components';
import { useAppSelector } from 'src/redux';
import { DashboardCard } from 'src/components';
import { Proof } from 'src/models';
import { SelectedProofContext } from '../SelectedProofContextProvider';
import { ProofViewHeader } from './ProofViewHeader';
import { ProofViewJson } from './ProofViewJson';
import './ProofView.scss';

/**
 * Proof view.
 *
 * @returns React component.
 */
export const ProofView = (): ReactElement => {
    const { selectedProofId } = useContext(SelectedProofContext);
    const isLoadingProofs = useAppSelector(s => s.proofState.isLoadingProofs);
    const proofData = useAppSelector(s => s.proofState.proofs.find(x => x.id === selectedProofId));

    return (
        <DashboardCard className="proofView">
            <ProofViewHeader proof={proofData} />
            {ProofViewFactory(isLoadingProofs, proofData)}
        </DashboardCard>
    );
};

/**
 * Conditionally renders proof data. First true case renders.
 *
 * @param loadingProofs Loading proof data from dbms.
 * @param proof Proof data.
 * @returns View, based on proof data state.
 */
const ProofViewFactory = (loadingProofs: boolean, proof?: Proof) => {
    switch (true) {
        case loadingProofs && !proof:
            return <Spinner grow />;
        case proof !== undefined:
            return <ProofViewJson proof={proof!} />;
        default:
            <h5>No proof data was found.</h5>;
    }
};
