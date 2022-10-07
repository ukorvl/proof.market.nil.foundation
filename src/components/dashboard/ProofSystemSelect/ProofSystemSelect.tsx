/**
 * @file React component.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

import { ReactElement, useRef } from 'react';
import { Select, Size, uniqueId } from '@nilfoundation/react-components';
import { useSelector } from 'react-redux';
import { ProofSystem } from '../../../enums';
import { RootStateType } from '../../../redux';
import './ProofSystemSelect.scss';

/**
 * Proof system select.
 *
 * @returns React component.
 */
export const ProofSystemSelect = (): ReactElement => {
    const {current: selectId} = useRef(uniqueId('proof-system-select'));
    const selectedProofSystem = useSelector((s: RootStateType) => s.proofSystemState.proofSystem);

    return (
        <nav className="verificationSystemSelect">
            <label htmlFor={selectId}>Select proof system</label>
            <Select
                size={Size.lg}
                id={selectId}
                menuClosedIcon="fa-solid fa-angle-down"
                menuOpendIcon="fa-solid fa-angle-up"
            >
                {Object.keys(ProofSystem).map(x =>
                    <Select.Option
                        key={x}
                        disabled={x !== ProofSystem.Placeholder}
                        value={x}
                        title={x}
                        defaultSelected={x === selectedProofSystem}
                    />
                )}
            </Select>
        </nav>
    );
};
