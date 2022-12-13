/**
 * @file React component.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

import { KeyboardEventHandler, ReactElement } from 'react';
import { Button, Icon, Size, Variant } from '@nilfoundation/react-components';
import { ProofDto } from 'src/models';
import { useDownloadJsonFile } from 'src/hooks';

/**
 * Props.
 */
type ProofViewHeaderProps = {
    proof?: ProofDto;
};

/**
 * Proof view header.
 *
 * @param {ProofViewHeaderProps} props Props.
 * @returns React component.
 */
export const ProofViewHeader = ({ proof }: ProofViewHeaderProps): ReactElement => {
    const downloadJson = useDownloadJsonFile(`proof-${proof?.id}`, JSON.stringify(proof));

    const keyDownHandler: KeyboardEventHandler = e => {
        if (e.key !== 'Enter' && e.key !== ' ') {
            return;
        }

        downloadJson();
    };

    return (
        <div className="proofViewHeader">
            <h4>Proof detailed info</h4>
            <Button
                variant={Variant.success}
                disabled={proof === undefined}
                size={Size.sm}
                onClick={downloadJson}
                onKeyDown={keyDownHandler}
                aria-label="Download proof as JSON file"
            >
                <Icon iconName="fa-solid fa-download" />
                JSON
            </Button>
        </div>
    );
};
