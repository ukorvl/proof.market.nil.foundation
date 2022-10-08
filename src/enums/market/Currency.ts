/**
 * @file Enum declaration.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

/**
 * Currency type.
 */
export enum Currency {
    Solana = 'Solana',
    Mina = 'Mina',
    Ethereum = 'Ethereum',
}

/**
 *
 * @param currency Currency.
 * @returns Path to currency image.
 */
export const getCurrencyImage = (currency: Currency) => `${process.env.PUBLIC_URL}currencies/${currency}-icon.svg`;
