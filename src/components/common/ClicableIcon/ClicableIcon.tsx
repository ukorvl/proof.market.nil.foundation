/**
 * @file React component.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

import { Button, ButtonProps, Icon } from '@nilfoundation/react-components';
import styles from './ClicableIcon.module.scss';

/**
 * Props.
 */
type ClicableIconProps = {
    iconName: string;
} & ButtonProps<HTMLButtonElement>;

/**
 * Button, that looks like an icon.
 *
 * @param {ClicableIconProps} props Props.
 * @returns React component.
 */
export const ClicableIcon = ({ iconName, className, ...rest }: ClicableIconProps): JSX.Element => {
    return (
        <Button
            className={`${styles.button} ${className ?? ''}`}
            {...rest}
        >
            <Icon iconName={iconName} />
        </Button>
    );
};
