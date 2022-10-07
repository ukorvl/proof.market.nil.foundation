/**
 * @file React component.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

import { ReactElement, useRef } from 'react';
import { ListGroup } from '@nilfoundation/react-components';
import { SwitchTransition, CSSTransition } from 'react-transition-group';
import { useSelector } from 'react-redux';
import { RootStateType } from '../../../redux';
import { getByProofSystem } from '../../../enums';
import { CurrenciesListItem } from './CurrenciesListItem';
import './CurrenciesList.scss';

/**
 * Currencies list.
 *
 * @returns React component.
 */
export const CurrenciesList = (): ReactElement => {
    const nodeRef = useRef<HTMLDivElement>(null);
    const selectedProofSystem = useSelector((s: RootStateType) => s.proofSystemState.proofSystem);

    return (
        <SwitchTransition mode="out-in">
             <CSSTransition
                key={selectedProofSystem}
                nodeRef={nodeRef}
                addEndListener={(done) => {
                    nodeRef.current && nodeRef.current.addEventListener("transitionend", done, false);
                }}
                classNames="fade"
            >
                <ListGroup ref={nodeRef} className="currenciesList">
                    <h5>Tokens</h5>
                    {getByProofSystem(selectedProofSystem).map(x =>
                        <CurrenciesListItem key={x} currency={x} />
                    )}
                </ListGroup>
            </CSSTransition>
        </SwitchTransition>
    );
};
