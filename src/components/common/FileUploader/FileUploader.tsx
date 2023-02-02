/**
 * @file React component.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

import type { ReactElement } from 'react';
import { useState } from 'react';
import { Icon } from '@nilfoundation/react-components';
import { useDropzone } from 'react-dropzone';
import type { DropzoneOptions, FileRejection, DropEvent } from 'react-dropzone';
import './FileUploader.scss';

/**
 * Props.
 */
type FileUploaderProps = {
    title?: string;
} & DropzoneOptions;

/**
 *
 * @param {FileUploaderProps} props Props.
 * @returns React component.
 */
export const FileUploader = ({
    title = "Drag'n drop some files here, or click to select files",
    onDrop,
    ...restOptions
}: FileUploaderProps): ReactElement => {
    const [textMessage, setTextMessage] = useState(title);

    const onDropHandler = (
        acceptedFiles: File[],
        fileRejections: FileRejection[],
        event: DropEvent,
    ) => {
        if (Object.keys(fileRejections).length !== 0) {
            setTextMessage('Please submit valid file type');
        }

        onDrop && onDrop(acceptedFiles, fileRejections, event);
    };

    const { acceptedFiles, getRootProps, getInputProps, isDragActive } = useDropzone({
        ...restOptions,
        onDrop: onDropHandler,
    });

    return (
        <div
            className={`fileUploader ${isDragActive ? 'fileUploader-dragActive' : ''}`}
            {...getRootProps()}
        >
            <input {...getInputProps()} />
            {acceptedFiles.length !== 0 ? (
                <span className="fileUploader__files">
                    {acceptedFiles.map(x => (
                        <span key={x.name}>{x.name}</span>
                    ))}
                </span>
            ) : (
                <span className="fileUploader__message">{textMessage}</span>
            )}
            <Icon iconName="fa-solid fa-circle-arrow-up" />
        </div>
    );
};
