/**
 * @file React component.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

import { DetailedHTMLProps, HTMLAttributes, ReactElement } from 'react';

/**
 * Props.
 */
type THeaderProps = DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> & {
    sticky?: boolean;
};

/**
 * Table column header.
 *
 * @param {THeaderProps} props Props.
 * @returns React component.
 */
export const THeader = ({ children, ...rest }: THeaderProps): ReactElement => {
    return (
        <div
            role="columnheader"
            {...rest}
        >
            {children}
        </div>
    );
};
