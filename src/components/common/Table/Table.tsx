/**
 * @file React component.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

import { ReactElement, ReactNode } from 'react';
import { Table as DefaultTable } from '@nilfoundation/react-components';
import './Table.scss';

/**
 * Props.
 */
type TableProps = {
    children: ReactNode;
    className?: string;
};

/**
 * Table template.
 *
 * @param {TableProps} props Props.
 * @returns React component.
 */
export const Table = ({ children, className }: TableProps): ReactElement => {
    return (
        <DefaultTable
            className={`styledTable ${className ?? ''}`}
            condensed
            responsive
        >
            {children}
        </DefaultTable>
    );
};
