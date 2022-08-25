import { ReactElement, useState, useEffect } from 'react';
import { Container, Row, Col, Select, Jumbotron } from '../../components';
import { Size } from '../../enums';
import { CurrencyMetricsFactory } from './CurrencyMetricsFactory';
import { CurrencySelectOption } from './components';
import { Currency } from './enums';

const baseDocumentTitle = '=nil; Foundation';

export const MetricsView = (): ReactElement => {
    const [currency, setCurrency] = useState<Currency>();

    const capitalizeFirstLetter = (text: string): string =>
        text.charAt(0).toUpperCase() + text.slice(1);

    useEffect(() => {
        if (!currency) {
            return;
        }

        const capitalizedCurrency = capitalizeFirstLetter(currency);

        document.title = `${baseDocumentTitle} - ${capitalizedCurrency} Verification`
    }, [currency]);

    return (
        <Container>
            <Row className="mb-20" >
                <Col md={12} sm={12}>
                    <Select
                        onSelect={setCurrency}
                        className="currencySelect"
                        size={Size.lg}
                    >
                        <CurrencySelectOption
                            value={Currency.Solana}
                            title={capitalizeFirstLetter(Currency.Solana)}
                            imageSrc={`${process.env.PUBLIC_URL}solana-icon.svg`}
                            defaultSelected
                        />
                        <CurrencySelectOption
                            disabled
                            value={Currency.Mina}
                            title={capitalizeFirstLetter(Currency.Mina)}
                            imageSrc={`${process.env.PUBLIC_URL}mina-icon.svg`}
                        />
                        <CurrencySelectOption
                            disabled
                            value={Currency.Ethereum}
                            title={capitalizeFirstLetter(Currency.Ethereum)}
                            imageSrc={`${process.env.PUBLIC_URL}ethereum-icon.svg`}
                        />
                    </Select>
                </Col>
            </Row>
            <Row>
                <Col md={12} sm={12}>
                    <Jumbotron>
                       <CurrencyMetricsFactory currency={currency} />
                    </Jumbotron>
                </Col>
            </Row>
        </Container>
    );
};
