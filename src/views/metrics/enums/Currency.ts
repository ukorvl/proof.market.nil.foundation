export enum Currency {
    Solana = 'Solana',
    Mina = 'Mina',
    Ethereum = 'Ethereum',
}

export const getRepositoryName = (currency: Currency) => {
    switch (currency) {
        case Currency.Solana:
            return `${repoOwner}/solana-state-proof`;
    }
};

const repoOwner = 'NilFoundation';
