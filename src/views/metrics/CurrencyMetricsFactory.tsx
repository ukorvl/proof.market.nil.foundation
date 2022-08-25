import { ReactElement } from 'react';
import { Currency } from './enums';
import { SolanaMetrics } from './SolanaMetrics'

/*
 * Props.
 */
type MetricsViewFactoryProps = {
    currency?: Currency;
};

export const CurrencyMetricsFactory = ({ currency }: MetricsViewFactoryProps): ReactElement => {
    switch (currency) {
        case Currency.Solana:
            return <SolanaMetrics />;
        case Currency.Mina:
        case Currency.Ethereum:
        default:
            return <h1>No data here...</h1>;
    };
};
