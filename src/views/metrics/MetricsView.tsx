import { ReactElement, useState, useEffect } from 'react';
import { Icon, Button, Jumbotron, Container, Row, Col, Select, SelectOption, Size } from '@nilfoundation/react-components';
import { CurrencyMetricsFactory } from './CurrencyMetricsFactory';
import { CurrencySelectOption } from './components';
import { Currency, getRepositoryName, ProofSystem } from './enums';

const baseDocumentTitle = '=nil; Foundation';
const badgeHrefPrefix = 'https://github.com/';

export const MetricsView = (): ReactElement => {
    const [currency, setCurrency] = useState<Currency>();
    const badgeHref = currency ? `${badgeHrefPrefix}${getRepositoryName(currency)}` : '';

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [proofSystem, setProofSystem] = useState<ProofSystem>();

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
                <Col md={6} sm={12}>
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
                <Col md={6} sm={12}>
                    <Select
                        onSelect={setProofSystem}
                        className="currencySelect"
                        size={Size.lg}
                    >
                        <SelectOption
                            disabled
                            value={ProofSystem.Placeholder}
                            title={ProofSystem.Placeholder}
                            defaultSelected
                        />
                        <SelectOption
                            disabled
                            value={ProofSystem.Kimchi}
                            title={ProofSystem.Kimchi}
                        />
                        <SelectOption
                            disabled
                            value={ProofSystem.Stark}
                            title={ProofSystem.Stark}
                        />
                    </Select>
                </Col>
            </Row>
            <Row>
                <Col md={12} sm={12}>
                    <Jumbotron>
                        <Container>
                            <Row>
                                <Col md={12} sm={12}>
                                    <h3>
                                        <a href={badgeHref} target="_blank" rel="noreferrer">
                                            <Button
                                                className="githubBadge"
                                                block
                                            >
                                                <Icon iconName="fa fa-github" />
                                                {currency && getRepositoryName(currency)}
                                            </Button>
                                        </a>
                                    </h3>
                                </Col>
                            </Row>
                        </Container>
                       <CurrencyMetricsFactory currency={currency} />
                    </Jumbotron>
                </Col>
            </Row>
        </Container>
    );
};
