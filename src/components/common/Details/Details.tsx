/**
 * @file React component.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

import { ReactElement, ReactNode, useState } from 'react';
import { Icon } from '@nilfoundation/react-components';
import './Details.scss';

/**
 * Props.
 */
type DetailsProps = {
    children: ReactNode;
    title: ReactNode;
    defaultOpen?: boolean;
};

/**
 * Details.
 *
 * @param {DetailsProps} props Props.
 * @returns React component.
 */
export const Details = ({ children, title, defaultOpen = true }: DetailsProps): ReactElement => {
    const [isOpen, setIsOpen] = useState(defaultOpen);
    const toggleIsOpen = () => setIsOpen(!isOpen);

    return (
        <details
            className="details"
            open={defaultOpen}
        >
            <summary onClick={toggleIsOpen}>
                {title}
                <Icon iconName={`fa-solid fa-angle-${isOpen ? 'up' : 'down'}`} />
            </summary>
            {children}
        </details>
    );
};
