/**
 * @file React component.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

import { ReactElement, useContext } from 'react';
import { ListGroup, Media, Spinner } from '@nilfoundation/react-components';
import { selectPartialProofList, useAppSelector } from 'src/redux';
import { DashboardCard } from 'src/components/common';
import { SelectedProofContext } from '../SelectedProofContextProvider';
import './ProofList.scss';

/**
 * Proof list.
 *
 * @returns React component.
 */
export const ProofList = (): ReactElement => {
    const proofList = useAppSelector(selectPartialProofList);
    const loadingProofs = useAppSelector(s => s.proofState.isLoadingProofs);
    const getProofsError = useAppSelector(s => s.proofState.error);

    return (
        <DashboardCard className="proofList">
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
    proofList: ReturnType<typeof selectPartialProofList>,
    loadingProofs: boolean,
    getProofsError: boolean,
) => {
    const { selectedProofId, setSelectedProofId } = useContext(SelectedProofContext);
    switch (true) {
        case loadingProofs:
            return <Spinner grow />;
        case getProofsError:
            return <h5>Error while getting proofs.</h5>;
        case !!proofList.length:
            return (
                <ListGroup>
                    {proofList.map(x => (
                        <ListGroup.Item
                            key={x.id}
                            onClick={() => setSelectedProofId(x.id)}
                            active={x.id === selectedProofId}
                        >
                            <Media>
                                <Media.Body>
                                    <Media.Heading>{`id: ${x.id}`}</Media.Heading>
                                    {`bid_id: ${x.bid_id}`}
                                </Media.Body>
                            </Media>
                        </ListGroup.Item>
                    ))}
                </ListGroup>
            );
        default:
            <h5>No proofs.</h5>;
    }
};
