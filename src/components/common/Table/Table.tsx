/**
 * @file React component.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

import { DetailedHTMLProps, HTMLAttributes, ReactElement } from 'react';
import './Table.scss';

/**
 * Props.
 */
type TableProps = DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>;

/**
 * Table.
 *
 * @param {TableProps} props Props.
 * @returns React component.
 */
export const Table = ({ className, children, ...rest }: TableProps): ReactElement => {
    return (
        <div
            role="table"
            className={`styledTable ${className ?? ''}`}
            {...rest}
        >
            {children}
        </div>
    );
};
