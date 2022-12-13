/**
 * @file React component.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

import { DetailedHTMLProps, HTMLAttributes, ReactElement } from 'react';

/**
 * Props.
 */
type TRowProps = DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>;

/**
 * Table row.
 *
 * @param {TRowProps} props Props.
 * @returns React component.
 */
export const TRow = ({ children, ...rest }: TRowProps): ReactElement => {
    return (
        <div
            role="row"
            {...rest}
        >
            {children}
        </div>
    );
};
