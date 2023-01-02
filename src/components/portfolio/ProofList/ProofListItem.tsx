/**
 * @file React component.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

import { ReactElement } from 'react';
import { ListGroup, Media } from '@nilfoundation/react-components';
import { Link } from 'react-router-dom';
import { Path } from 'src/routing';
import { Proof } from 'src/models';
import { selectSelectedProofId, useAppSelector } from 'src/redux';
import styles from './ProofList.module.scss';

/**
 * Props.
 */
type ProofListItemProps = {
    proof: Proof;
};

/**
 * Proof list item.
 *
 * @param {ProofListItemProps} props Props.
 * @returns React component.
 */
export const ProofListItem = ({ proof: { id } }: ProofListItemProps): ReactElement => {
    const selectedProofId = useAppSelector(selectSelectedProofId);

    return (
        <ListGroup.Item active={id === selectedProofId}>
            <Link to={`${Path.portfolio}/${id}`}>
                <Media>
                    <Media.Body className={styles.itemBody}>{`id: ${id}`}</Media.Body>
                </Media>
            </Link>
        </ListGroup.Item>
    );
};
