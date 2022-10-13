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
import './ProofList.scss';

/**
 * Proof list.
 *
 * @returns React component.
 */
export const ProofList = (): ReactElement => {
    const proofList = useAppSelector(s => s.proofState.proofs);
    const loadingProofs = useAppSelector(s => s.proofState.isLoadingProofs);

    return (
        <DashboardCard>
            <h4>Proof list</h4>
            {loadingProofs && !proofList.length ? (
                <Spinner grow />
            ) : (
                <ListGroup className="currenciesList">
                    {proofList.map(x => (
                        <ReactJson
                            src={x}
                            key={x.id}
                            collapsed
                            name={null}
                            displayDataTypes={false}
                            theme={jsonViewerTheme}
                        />
                    ))}
                </ListGroup>
            )}
        </DashboardCard>
    );
};
