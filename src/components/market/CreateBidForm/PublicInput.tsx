/**
 * @file React component.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

import { ReactElement, useCallback, useContext } from 'react';
import {
    Controller,
    ControllerRenderProps,
    useFormContext,
    UseFormSetError,
} from 'react-hook-form';
import { Form } from '@nilfoundation/react-components';
import { FileRejection } from 'react-dropzone';
import { CreateBid } from 'src/models';
import { FileUploader as FileUploaderTemplate } from 'src/components';
import { OrderManagementContext } from '../OrderManagementContextProvider';
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
        setError,
        formState: { errors },
    } = useFormContext<CreateBid>();

    return (
        <Form.Group
            hasError={!!errors['public_input']}
            className="publicInputContainer"
        >
            <div className="publicInputContainer__label">
                <Form.Label htmlFor="public_input">Public_input</Form.Label>
            </div>
            <Controller
                name="public_input"
                control={control}
                rules={{
                    validate: val => val !== null,
                }}
                render={({ field: { ref: _, ...rest } }) => (
                    <FileUploader
                        {...rest}
                        setError={setError}
                        disabled={processing}
                    />
                )}
            />
        </Form.Group>
    );
};

/**
 * Props.
 */
type FileUploaderProps = {
    disabled?: boolean;
    setError: UseFormSetError<CreateBid>;
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
                console.log(obj);
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
