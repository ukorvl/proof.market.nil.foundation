/**
 * @file React component.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

import { DetailedHTMLProps, HTMLAttributes, ReactElement } from 'react';
import clsx from 'clsx';
import styles from './Table.module.scss';

/**
 * Props.
 */
type THeadProps = DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> & {
    sticky?: boolean;
    isReversed?: boolean;
};

/**
 * Table head.
 *
 * @param {THeadProps} props Props.
 * @returns React component.
 */
export const THead = ({ sticky, className, children, ...rest }: THeadProps): ReactElement => {
    const tHeadClassName = clsx('tableHead', className, sticky && 'sticky');

    return (
        <div
            role="rowgroup"
            className={tHeadClassName}
            {...rest}
        >
            {children}
        </div>
    );
};
