/**
 * @file React component.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

import { ReactElement, memo } from 'react';
import { Media, Spinner } from '@nilfoundation/react-components';
import clsx from 'clsx';
import { useAppSelector } from 'src/redux';
import { PriceChangeIndicator } from '../PriceChangeIndicator';

/**
 * Props.
 */
type CircuitsListItemInfoProps = {
    isSelected: boolean;
    cost?: number | null;
    change?: number | null;
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
    const className = clsx('dailyChangeIndicator', isSelected && 'dailyChangeIndicator_selected');

    return (
        <Media.Item position="right">
            {cost && <div>{`$${cost.toFixed(4)}`}</div>}
            {!!change && (
                <PriceChangeIndicator
                    change={change}
                    className={className}
                />
            )}
            {isLoadingInfo && cost === undefined && change === undefined && <Spinner />}
        </Media.Item>
    );
});
