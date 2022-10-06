/**
 * @file Enum declaration.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

import { ProofSystem } from "./ProofSystem";

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
 * @returns Github repository name.
 */
export const getRepositoryName = (currency: Currency) => {
    switch (currency) {
        case Currency.Solana:
            return `${repoOwner}/solana-state-proof`;
    }
};

/**
 *
 * @param currency Currency.
 * @returns Path to currency image.
 */
export const getCurrencyImage = (currency: Currency) => `${process.env.PUBLIC_URL}currencies/${currency}-icon.svg`;

/**
 *
 * @param proofSystem Proff system.
 * @returns Avaliable currencies for provided proof system.
 */
export const getByProofSystem = (proofSystem: ProofSystem) => {
    switch (proofSystem) {
        case ProofSystem.Placeholder:
            return [Currency.Solana, Currency.Mina, Currency.Ethereum];
        default:
            return [];
    }
}

const repoOwner = 'NilFoundation';
