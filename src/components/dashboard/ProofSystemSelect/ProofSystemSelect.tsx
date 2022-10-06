/**
 * @file React component.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

import { ReactElement, useRef } from 'react';
import { Select, Size, uniqueId } from '@nilfoundation/react-components';
import { ProofSystem } from '../../../enums';
import './ProofSystemSelect.scss';

/**
 * Proof system select.
 *
 * @returns React component.
 */
export const ProofSystemSelect = (): ReactElement => {
    const {current: selectId} = useRef(uniqueId('proof-system-select'));

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
                        disabled
                        value={x}
                        title={x}
                        defaultSelected={x === ProofSystem.Placeholder}
                    />
                )}
            </Select>
        </nav>
    );
};
