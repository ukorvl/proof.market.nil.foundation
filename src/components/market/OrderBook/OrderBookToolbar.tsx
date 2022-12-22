/**
 * @file React component.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

import { ReactElement, useContext } from 'react';
import { Dropdown } from '@nilfoundation/react-components';
import { OrderBookPriceStep } from 'src/enums';
import { OrderBookSettingsContext } from './OrderBookSettingsContext';
import styles from './OrderBook.module.scss';

/**
 * Props.
 */
type OrderBookToolbarProps = {
    disabled: boolean;
};

/**
 * OrderBook toolbar.
 *
 * @param {OrderBookToolbarProps} props Props.
 * @returns React component.
 */
export const OrderBookToolbar = ({ disabled }: OrderBookToolbarProps): ReactElement => {
    const { priceStep, setPriceStep } = useContext(OrderBookSettingsContext);

    return (
        <Dropdown>
            <Dropdown.Button
                className={styles.changePriceStepButton}
                disabled={disabled}
            >
                {priceStep}
            </Dropdown.Button>
            <Dropdown.Menu align="right">
                {Object.values(OrderBookPriceStep).map(x => (
                    <Dropdown.Item
                        key={x}
                        onSelect={() => setPriceStep(x)}
                        active={x === priceStep}
                    >
                        <span>{x}</span>
                    </Dropdown.Item>
                ))}
            </Dropdown.Menu>
        </Dropdown>
    );
};
