/**
 * @file React component.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

import type { KeyboardEventHandler, ReactElement } from 'react';
import { useMemo } from 'react';
import { Button, Icon, Spinner, Variant } from '@nilfoundation/react-components';
import { getProofById } from 'src/api';
import { useDownloadJson } from 'src/hooks';
import type { Proof } from 'src/models';
import styles from './ProofContentCard.module.scss';

/**
 * Props.
 */
type ProofViewHeaderProps = {
    proof?: Proof;
};

/**
 * Proof content card header.
 *
 * @param {ProofViewHeaderProps} props Props.
 * @returns React component.
 */
export const ProofContentCardToolbar = ({ proof }: ProofViewHeaderProps): ReactElement => {
    const fetcher = useMemo(
        () => (proof?.id !== undefined ? () => getProofById(proof.id) : undefined),
        [proof?.id],
    );
    const { downloadJson, loading } = useDownloadJson({
        fileName: `proof-${proof?.id}`,
        fetcher,
    });

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
                disabled={proof === undefined || loading}
                onClick={downloadJson}
                onKeyDown={keyDownHandler}
                aria-label="Download proof as JSON file"
            >
                <Icon iconName="fa-solid fa-download" />
                JSON
                {loading && <Spinner />}
            </Button>
        </div>
    );
};
