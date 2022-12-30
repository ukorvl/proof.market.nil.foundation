/**
 * @file React component.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

import { ReactElement, ReactNode } from 'react';
import { useParams } from 'react-router-dom';
import { useProofIdState } from 'src/hooks';
import { SelectedProofContext } from './SelectedProofContext';

/**
 * Poprs.
 */
type SelectedProofContextProviderProps = {
    children?: ReactNode;
};

/**
 * Selected proof context provider.
 *
 * @param {SelectedProofContextProviderProps} props Props.
 * @returns React component.
 */
export const SelectedProofContextProvider = ({
    children,
}: SelectedProofContextProviderProps): ReactElement => {
    const [selectedProofId, setSelectedProofId] = useProofIdState();

    return (
        <SelectedProofContext.Provider value={{ selectedProofId, setSelectedProofId }}>
            {children}
        </SelectedProofContext.Provider>
    );
};
