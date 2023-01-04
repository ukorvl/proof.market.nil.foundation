/**
 * @file React component.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

import { ReactElement } from 'react';
import { Label } from '@nilfoundation/react-components';
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

    if (!userBalance) {
        return <></>;
    }

    const balance = userBalance.balance?.toFixed(2);
    const blocked = userBalance.blocked?.toFixed(2);
    const iconName = hidden ? 'fa-eye-slash' : 'fa-eye';

    return (
        <div className={`${styles.balance} ${className ?? ''}`}>
            <ClicableIcon
                onClick={() => setHidden(!hidden)}
                iconName={`fa-solid ${iconName}`}
            />
            {balance !== undefined && (
                <span
                    className={`${styles.text} ${hidden ? styles.hiddenText : ''}`}
                    title={hidden ? undefined : balance}
                >
                    {`${hidden ? '*'.repeat(balance.length) : balance}`}
                </span>
            )}
            {blocked !== undefined && (
                <Label className={styles.label}>
                    <span
                        className={hidden ? styles.hiddenText : ''}
                        title={`Blocked: ${blocked}`}
                    >
                        {`${hidden ? '*'.repeat(blocked.length) : blocked}`}
                    </span>
                </Label>
            )}
            <span className={styles.currency}>USD</span>
        </div>
    );
};
