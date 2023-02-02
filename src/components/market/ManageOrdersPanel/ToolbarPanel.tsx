/**
 * @file React component.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

import type { ReactElement } from 'react';
import { Button, Size, Variant, Spinner } from '@nilfoundation/react-components';

/**
 * Props.
 */
type ToolbarPanelProps = {
    onAccept: () => void;
    onDecline: () => void;
    processing: boolean;
    message?: string;
};

/**
 * Toolbar panel.
 *
 * @param {ToolbarPanelProps} props Props.
 * @returns React component.
 */
export const ToolbarPanel = ({
    onAccept,
    onDecline,
    processing,
    message,
}: ToolbarPanelProps): ReactElement => {
    return (
        <div className="toolbarPanel">
            {message && <div className="message">{message}</div>}
            <div className="buttons">
                <Button
                    onClick={onAccept}
                    variant={Variant.success}
                    size={Size.lg}
                    disabled={processing}
                    block
                >
                    Yes
                    {processing && <Spinner />}
                </Button>
                <Button
                    onClick={onDecline}
                    variant={Variant.danger}
                    size={Size.lg}
                    disabled={processing}
                    block
                >
                    No
                </Button>
            </div>
        </div>
    );
};
