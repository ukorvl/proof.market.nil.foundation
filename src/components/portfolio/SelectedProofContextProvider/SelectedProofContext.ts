/**
 * @file React context.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

import { createContext } from 'react';

/**
 * Context type.
 */
type SelectedProofContextModel = {
    selectedProofId?: number;
    setSelectedProofId: (id?: number) => void;
};

/**
 * Selected proof context.
 */
export const SelectedProofContext = createContext<SelectedProofContextModel>(
    {} as SelectedProofContextModel,
);
