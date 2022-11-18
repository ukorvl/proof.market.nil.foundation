/**
 * @file React component.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

import { ReactElement, memo } from 'react';
import { Icon, Media, Spinner } from '@nilfoundation/react-components';
import clsx from 'clsx';
import { useAppSelector } from 'src/redux';

/**
 * Props.
 */
type CircuitsListItemInfoProps = {
    isSelected: boolean;
    cost?: number;
    change?: number;
};

/**
 * Currencies list item brief info.
 *
 * @param {CircuitsListItemInfoProps} props - Props.
 * @returns React component.
 */
export const CircuitsListItemInfo = memo(function CircuitsListItemInfo({
    cost,
    change,
    isSelected,
}: CircuitsListItemInfoProps): ReactElement {
    const isLoadingInfo = useAppSelector(s => s.circuitsState.isLoadingCircuitsInfo);
    const isGrow = !!change && change > 0;
    const iconName = `fa-solid fa-arrow-${isGrow ? 'up' : 'down'}`;
    const className = clsx(
        'dailyChangeIndicator',
        !isSelected && (isGrow ? 'growTextColor' : 'lossTextColor'),
    );

    return (
        <Media.Item position="right">
            {cost && <div>{`$${cost.toFixed(4)}`}</div>}
            {change && (
                <div className={className}>
                    <Icon iconName={`fa-solid fa-${iconName}`} />
                    {`${change.toFixed(2)}%`}
                </div>
            )}
            {isLoadingInfo && !cost && !change && <Spinner grow />}
        </Media.Item>
    );
});
