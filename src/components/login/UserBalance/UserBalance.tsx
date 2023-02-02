/**
 * @file React component.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

import type { ReactElement } from 'react';
import { useSelector } from 'react-redux';
import { selectUserBalance } from 'src/redux';
import { useLocalStorage } from 'src/hooks';
import { ClicableIcon } from 'src/components/common';
import styles from './UserBalance.module.scss';

/**
 * Props.
 */
type UserBalanceProps = {
    className?: string;
};

/**
 * User balance.
 *
 * @param {UserBalanceProps} props - Props.
 * @returns React component.
 */
export const UserBalance = ({ className }: UserBalanceProps): ReactElement => {
    const [hidden, setHidden] = useLocalStorage('userBalanceHidden', false);
    const userBalance = useSelector(selectUserBalance);
    const iconName = hidden ? 'fa-eye-slash' : 'fa-eye';

    if (!userBalance) {
        return <></>;
    }

    return (
        <div className={`${styles.balance} ${className ?? ''}`}>
            <ClicableIcon
                onClick={() => setHidden(!hidden)}
                iconName={`fa-solid ${iconName}`}
            />
            <span className={`${styles.text} ${hidden ? styles.hiddenText : ''}`}>
                {`${hidden ? '*'.repeat(userBalance.toString().length) : userBalance}`}
            </span>
            <span className={styles.currency}>USD</span>
        </div>
    );
};
