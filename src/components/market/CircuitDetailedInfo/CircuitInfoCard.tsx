/**
 * @file React component.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

import { ReactElement } from 'react';
//import { Icon, Label } from '@nilfoundation/react-components';
import { Circuit } from 'src/models';
import styles from './CircuitDetailedInfo.module.scss';

/**
 * Props.
 */
type CircuitInfoCardProps = {
    circuit: Circuit;
};

/**
 * Circuit info card.
 *
 * @param {CircuitInfoCardProps} props Props.
 * @returns React component.
 */
export const CircuitInfoCard = ({ circuit }: CircuitInfoCardProps): ReactElement => {
    const { name, inputDescription, description } = circuit;

    return (
        <>
            <h4>{`${name}${inputDescription ? ` (${inputDescription})` : ''}/USD`}</h4>
            <h5 className={styles.description}>{description}</h5>
            {/* <p>
                <Label
                    href={repository}
                    target="_blank"
                >
                    <Icon
                        iconName="fa-brands fa-github"
                        srOnlyText="github repository link"
                    />
                    GitHub Repository
                </Label>
            </p> */}
        </>
    );
};
