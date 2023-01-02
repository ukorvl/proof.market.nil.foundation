/**
 * @file React component.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

import { ReactElement } from 'react';
import { useProofIdState } from 'src/hooks';

/**
 * Poprs.
 */
type SelectedProofProviderProps = {
    children: ReactElement;
};

/**
 * Provides selected proof id feature.
 *
 * @param {SelectedProofProviderProps} props Props.
 * @returns React component.
 */
export const SelectedProofProvider = ({ children }: SelectedProofProviderProps): ReactElement => {
    useProofIdState();

    return children;
};
