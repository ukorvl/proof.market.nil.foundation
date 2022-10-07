/**
 * @file React component.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

import { ReactElement } from 'react';
import { Image, ListGroup, Media } from '@nilfoundation/react-components';
import { useDispatch, useSelector } from 'react-redux';
import { Currency, getCurrencyImage } from '../../../enums';
import { RootStateType, UpdateCurrency } from '../../../redux';

/**
 * Props.
 */
type CurrencyListItemProps = {
    currency: Currency;
}

/**
 * Currencies list item.
 *
 * @param {CurrencyListItemProps} props - Props.
 * @returns React component.
 */
export const CurrenciesListItem = ({currency}: CurrencyListItemProps): ReactElement => {
    const dispatch = useDispatch();
    const selectedCurrency = useSelector((s: RootStateType) => s.currencyState.currency);
    const onSelectItem = () => { dispatch(UpdateCurrency(currency)) };

    return (
        <ListGroup.Item
            disabled={currency !== Currency.Solana}
            active={currency === selectedCurrency}
            onClick={onSelectItem}
        >
            <Media>
                <Media.Item>
                    <Image
                        source={getCurrencyImage(currency)}
                        height={48}
                        width={48}
                        alt="Mock image"
                    />
                </Media.Item>
                <Media.Body>
                    <Media.Heading>{currency}</Media.Heading>
                </Media.Body>
            </Media>
        </ListGroup.Item>
    );
};
