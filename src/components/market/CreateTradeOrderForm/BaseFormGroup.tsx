/**
 * @file React component.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

import { ReactElement, ReactNode } from 'react';
import { Form } from '@nilfoundation/react-components';

/**
 * Props.
 */
type BaseFormGroupProps = {
    hasError: boolean;
    children: (id?: string) => ReactNode;
    hintText?: string;
    labelText?: string;
    id?: string;
    className?: string;
};

/**
 * Base form group with label and hint.
 *
 * @param {BaseFormGroupProps} props Props.
 * @returns React component.
 */
export const BaseFormGroup = ({
    id,
    hasError,
    children,
    hintText,
    labelText,
    className,
}: BaseFormGroupProps): ReactElement => {
    return (
        <Form.Group
            hasError={hasError}
            className={className}
        >
            <Form.Label htmlFor={id}>{labelText}</Form.Label>
            {children(id)}
            <Form.Hint>{hintText}</Form.Hint>
        </Form.Group>
    );
};
