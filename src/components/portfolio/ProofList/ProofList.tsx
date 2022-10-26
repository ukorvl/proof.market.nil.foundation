/**
 * @file React component.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

import { ReactElement } from 'react';
import { ListGroup, Spinner } from '@nilfoundation/react-components';
import ReactJson from 'react-json-view';
import { useAppSelector } from 'src/redux';
import { DashboardCard } from 'src/components/common';
import { jsonViewerTheme } from 'src/constants';
import { Proof } from 'src/models';
import './ProofList.scss';

/**
 * Proof list.
 *
 * @returns React component.
 */
export const ProofList = (): ReactElement => {
    const proofList = useAppSelector(s => s.proofState.proofs);
    const loadingProofs = useAppSelector(s => s.proofState.isLoadingProofs);
    const getProofsError = useAppSelector(s => s.proofState.error);

    return (
        <DashboardCard>
            <h4>Proof list</h4>
            {ProofListViewFactory(proofList, loadingProofs, getProofsError)}
        </DashboardCard>
    );
};

/**
 * Conditionally renders proof data. First true case renders.
 *
 * @param proofList Proof list.
 * @param loadingProofs Proofs loading state.
 * @param getProofsError Proofs loading error.
 * @returns View, based on proof data state.
 */
const ProofListViewFactory = (
    proofList: Proof[],
    loadingProofs: boolean,
    getProofsError: boolean,
) => {
    switch (true) {
        case loadingProofs:
            return <Spinner grow />;
        case getProofsError:
            return <h5>Error while getting proofs.</h5>;
        case !!proofList.length:
            return (
                <ListGroup className="proofList">
                    {proofList.map(x => (
                        <ListGroup.Item key={x.id}>
                            <ReactJson
                                src={x}
                                name={null}
                                displayDataTypes={false}
                                theme={jsonViewerTheme}
                            />
                        </ListGroup.Item>
                    ))}
                </ListGroup>
            );
        default:
            <h5>No proofs.</h5>;
    }
};
