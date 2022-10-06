/**
 * @file React component.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

import { ReactElement } from 'react';
import { Image, ListGroup, Media } from '@nilfoundation/react-components';
import { Currency, getCurrencyImage } from '../../../enums';

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
    return (
        <ListGroup.Item href={`#${currency}`} disabled={currency !== Currency.Solana}>
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
