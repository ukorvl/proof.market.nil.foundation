/**
 * @file React component.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

import { KeyboardEventHandler, ReactElement } from 'react';
import { Button, Icon, Variant } from '@nilfoundation/react-components';
import { Proof } from 'src/models';
import { useDownloadJsonFile } from 'src/hooks';
import styles from './ProofView.module.scss';

/**
 * Props.
 */
type ProofViewHeaderProps = {
    proof?: Proof;
};

/**
 * Proof view header.
 *
 * @param {ProofViewHeaderProps} props Props.
 * @returns React component.
 */
export const ProofViewToolbar = ({ proof }: ProofViewHeaderProps): ReactElement => {
    const downloadJson = useDownloadJsonFile(`proof-${proof?.id}`, JSON.stringify(proof));

    const keyDownHandler: KeyboardEventHandler = e => {
        if (e.key !== 'Enter' && e.key !== ' ') {
            return;
        }

        downloadJson();
    };

    return (
        <div className={styles.toolbar}>
            <Button
                variant={Variant.primary}
                disabled={proof === undefined}
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
