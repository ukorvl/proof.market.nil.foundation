/**
 * @file React component.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

import { ReactElement, useContext } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import ReactJson, { InteractionProps } from 'react-json-view';
import { Form } from '@nilfoundation/react-components';
import { CreateBid } from 'src/models';
import { jsonViewerTheme } from 'src/constants';
import { OrderManagementContext } from '../OrderManagementContextProvider';

/**
 * Public_input filed input.
 *
 * @returns React component.
 */
export const PublicInput = (): ReactElement => {
    const { processing } = useContext(OrderManagementContext);
    const {
        control,
        formState: { errors },
    } = useFormContext<CreateBid>();

    return (
        <Form.Group hasError={!!errors['public_input']}>
            <Form.Label htmlFor="public_input">Public_input</Form.Label>
            <Controller
                name="public_input"
                control={control}
                render={({ field: { onChange, value } }) => (
                    <ReactJson
                        src={value}
                        collapsed={false}
                        enableClipboard
                        onEdit={(edit: InteractionProps) => onChange(edit.updated_src)}
                        onAdd={(add: InteractionProps) => onChange(add.updated_src)}
                        onDelete={(del: InteractionProps) => onChange(del.updated_src)}
                        displayDataTypes={false}
                        theme={jsonViewerTheme}
                    />
                )}
            />
        </Form.Group>
    );
};
