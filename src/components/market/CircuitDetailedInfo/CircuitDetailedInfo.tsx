/**
 * @file React component.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

import { ReactElement, memo } from 'react';
import { useSelector } from 'react-redux';
import { Icon, Label, Spinner } from '@nilfoundation/react-components';
import { selectCurrentCircuit, useAppSelector } from 'src/redux';
import styles from './CircuitDetailedInfo.module.scss';

/**
 * Currencies list.
 *
 * @returns React component.
 */
const CircuitDetailedInfoComponent = (): ReactElement => {
    const currentSelectedCircuit = useSelector(selectCurrentCircuit);
    const loadingCircuits = useAppSelector(s => s.circuitsState.isLoading);

    return (
        <div className={styles.container}>
            {loadingCircuits && !currentSelectedCircuit && <Spinner grow />}
            {currentSelectedCircuit ? (
                <>
                    <div className={styles.description}>
                        <span className="text-muted">Description:</span>
                        {currentSelectedCircuit.description}
                    </div>
                    <Label
                        href={currentSelectedCircuit.repository}
                        target="_blank"
                    >
                        <Icon
                            iconName="fa-brands fa-github"
                            srOnlyText="github repository link"
                        />
                        GitHub Repository
                    </Label>
                </>
            ) : (
                <h4>No circuit info was provided.</h4>
            )}
        </div>
    );
};

export const CircuitDetailedInfo = memo(CircuitDetailedInfoComponent);
