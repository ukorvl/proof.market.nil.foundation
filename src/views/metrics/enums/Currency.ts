export enum Currency {
    Solana = 'solana',
    Mina = 'mina',
    Ethereum = 'ethereum',
}

export const getRepositoryName = (currency: Currency) => {
    switch (currency) {
        case Currency.Solana:
            return `${repoPrefix}solana-state-proof`;
    }
};

const repoPrefix = 'NilFoundation/';
