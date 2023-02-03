/**
 * @file React component.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

import type { ReactElement } from 'react';
import { useContext } from 'react';
import { Dropdown } from '@nilfoundation/react-components';
import { OrderBookPriceStep } from 'src/enums';
import { useAuth } from 'src/hooks';
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
    const { priceStep, setPriceStep, displayUserOrders, setDisplayUserOrders } =
        useContext(OrderBookSettingsContext);
    const { isReadonly } = useAuth();

    return (
        <>
            <div className={styles.checkboxContainer}>
                <input
                    id="toggleDisplayUserOrders"
                    type="checkbox"
                    className={styles.checkbox}
                    checked={displayUserOrders}
                    onChange={() => setDisplayUserOrders(!displayUserOrders)}
                    disabled={isReadonly}
                />
                <label
                    className={styles.label}
                    htmlFor="toggleDisplayUserOrders"
                >
                    Show my orders
                </label>
            </div>
            <Dropdown>
                <Dropdown.Button
                    className={styles.changePriceStepButton}
                    disabled={disabled}
                >
                    {priceStep}
                </Dropdown.Button>
                <Dropdown.Menu align="right">
                    {Object.keys(OrderBookPriceStep)
                        .sort()
                        .map(x => (
                            <Dropdown.Item
                                key={x}
                                onSelect={() => setPriceStep(x as keyof typeof OrderBookPriceStep)}
                                active={x === priceStep}
                            >
                                <span>{x}</span>
                            </Dropdown.Item>
                        ))}
                </Dropdown.Menu>
            </Dropdown>
        </>
    );
};
