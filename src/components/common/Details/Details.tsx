/**
 * @file React component.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

import { KeyboardEventHandler, ReactElement, ReactNode, useState } from 'react';
import { Icon } from '@nilfoundation/react-components';
import styles from './Details.module.scss';

/**
 * Props.
 */
type DetailsProps = {
    children: ReactNode;
    title: ReactNode;
    defaultOpen?: boolean;
    bottomIndent?: boolean;
};

/**
 * Details.
 *
 * @param {DetailsProps} props Props.
 * @returns React component.
 */
export const Details = ({
    children,
    title,
    defaultOpen = true,
    bottomIndent = true,
}: DetailsProps): ReactElement => {
    const [isOpen, setIsOpen] = useState(defaultOpen);
    const toggleIsOpen = () => setIsOpen(!isOpen);

    const onKeyDownHandler: KeyboardEventHandler = e => {
        if (e.key !== 'Enter' && e.key !== ' ') {
            return;
        }

        toggleIsOpen();
    };

    return (
        <>
            <div
                className={`${styles.title} ${bottomIndent ? styles.bottomIndent : ''}`}
                onClick={toggleIsOpen}
                onKeyDown={onKeyDownHandler}
                role="button"
                tabIndex={0}
            >
                {title}
                <Icon iconName={`fa-solid fa-angle-${isOpen ? 'up' : 'down'}`} />
            </div>
            <>{isOpen && children}</>
        </>
    );
};
