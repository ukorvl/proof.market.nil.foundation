/**
 * @file React component.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

import { ReactElement, memo } from 'react';
import { Icon, Media } from '@nilfoundation/react-components';
import clsx from 'clsx';
import { useGetCircuitBriefInfo } from 'src/hooks';

/**
 * Props.
 */
type CircuitsListItemInfoProps = {
    id: string;
    isSelected: boolean;
};

/**
 * Currencies list item brief info.
 *
 * @param {CircuitsListItemInfoProps} props - Props.
 * @returns React component.
 */
export const CircuitsListItemInfo = memo(function CircuitsListItemInfo({
    id,
    isSelected,
}: CircuitsListItemInfoProps): ReactElement {
    const { currentPrice, dailyChange } = useGetCircuitBriefInfo(id);
    const isGrow = !!dailyChange && dailyChange > 0;
    const iconName = `fa-solid fa-arrow-${isGrow ? 'up' : 'down'}`;
    const className = clsx(
        'dailyChangeIndicator',
        !isSelected && (isGrow ? 'growTextColor' : 'lossTextColor'),
    );

    return (
        <Media.Item position="right">
            {currentPrice && <div>{`$${currentPrice.toFixed(4)}`}</div>}
            {dailyChange && (
                <div className={className}>
                    <Icon iconName={`fa-solid fa-${iconName}`} />
                    {`${dailyChange.toFixed(2)}%`}
                </div>
            )}
        </Media.Item>
    );
});
