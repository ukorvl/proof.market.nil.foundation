/**
 * @file React component.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

import { ReactElement, memo } from 'react';
import { Icon, Media, Spinner } from '@nilfoundation/react-components';
import { dequal as deepEqual } from 'dequal';
import clsx from 'clsx';
import { useAppSelector } from 'src/redux';

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
    const isLoadingInfo = useAppSelector(s => s.circuitsState.isLoadingCircuitsInfo);
    const info = useAppSelector(
        s => s.circuitsState.circuitsInfo.find(x => x.circuit_id === id),
        deepEqual,
    );

    const change = info?.daily_change;
    const cost = info?.current_cost;
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
            {isLoadingInfo && !info && <Spinner grow />}
        </Media.Item>
    );
});
