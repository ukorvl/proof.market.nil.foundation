/**
 * @file React component.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

import { ReactElement, useCallback, useContext } from 'react';
import { Controller, ControllerRenderProps, useFormContext } from 'react-hook-form';
import { FileRejection } from 'react-dropzone';
import { CreateBid } from 'src/models';
import { FileUploader as FileUploaderTemplate } from 'src/components';
import { OrderManagementContext } from '../OrderManagementContextProvider';
import { BaseFormGroup } from '../CreateTradeOrderForm';
import './PublicInput.scss';

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
        <BaseFormGroup
            hasError={!!errors['public_input']}
            labelText="Public Input"
            className="publicInput"
        >
            {() => (
                <Controller<CreateBid, 'public_input'>
                    name="public_input"
                    control={control}
                    rules={{
                        validate: val => val !== null,
                    }}
                    render={({ field: { ref: _, ...rest } }) => (
                        <FileUploader
                            {...rest}
                            disabled={processing}
                        />
                    )}
                />
            )}
        </BaseFormGroup>
    );
};

/**
 * Props.
 */
type FileUploaderProps = {
    disabled?: boolean;
} & Omit<ControllerRenderProps<CreateBid, 'public_input'>, 'ref'>;

/**
 * Renders file uploader.
 *
 * @param {FileUploaderProps} props Props.
 * @returns Recat component.
 */
const FileUploader = ({ onChange, disabled }: FileUploaderProps): ReactElement => {
    const handleJsonFile = useCallback(
        (acceptedFiles: File[], fileRejections: FileRejection[]) => {
            if (fileRejections.length !== 0) {
                onChange(null);
            }

            const reader = new FileReader();

            reader.onload = ({ target }) => {
                if (!target || !target.result) {
                    return;
                }

                const obj = JSON.parse(target.result as string);
                onChange(obj);
            };

            reader.onerror = () => {
                /*Do nothing*/
            };
            reader.onabort = () => {
                /*Do nothing*/
            };

            const file = acceptedFiles.at(0);
            file && reader.readAsText(file);
        },
        [onChange],
    );

    return (
        <FileUploaderTemplate
            multiple={false}
            disabled={disabled}
            accept={{
                'application/json': ['.json'],
            }}
            onDrop={handleJsonFile}
        />
    );
};
