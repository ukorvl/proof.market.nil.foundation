/**
 * @file React component.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

import { ReactElement, useContext } from 'react';
import { ListGroup, Spinner } from '@nilfoundation/react-components';
import ReactJson from 'react-json-view';
import { selectPartialProofList, useAppSelector } from 'src/redux';
import { DashboardCard } from 'src/components/common';
import { jsonViewerTheme } from 'src/constants';
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
                <ListGroup className="proofList">
                    {proofList.map(x => (
                        <ListGroup.Item
                            key={x.id}
                            onClick={() => setSelectedProofId(x.id)}
                            active={x.id === selectedProofId}
                        >
                            <ReactJson
                                src={x}
                                name={null}
                                displayDataTypes={false}
                                displayObjectSize={false}
                                enableClipboard={false}
                                theme={proofListJsonTheme}
                            />
                        </ListGroup.Item>
                    ))}
                </ListGroup>
            );
        default:
            <h5>No proofs.</h5>;
    }
};

/**
 * Custom JSON viewer theme for proof list.
 */
const proofListJsonTheme = {
    ...jsonViewerTheme,
    base02: 'transparent',
};
