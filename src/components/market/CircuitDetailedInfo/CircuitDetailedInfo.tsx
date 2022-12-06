/**
 * @file React component.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

import { ReactElement, useState } from 'react';
import { useSelector } from 'react-redux';
import { Image, Nav, Spinner } from '@nilfoundation/react-components';
import { selectCurrentCircuit, useAppSelector } from 'src/redux';
import { Circuit } from 'src/models';
import { getCurrencyImage } from 'src/enums';
import { Details, DashboardCard } from '../../common';
import { CircuitInfoCard } from './CircuitInfoCard';
import { DetailedInfoTab } from './DetailedInfoTab';
import { CircuitJsonView } from './CircuitJsonView';
import { CircuitStatsCard } from './CircuitStatsCard';
import styles from './CircuitDetailedInfo.module.scss';

/**
 * Currencies list.
 *
 * @returns React component.
 */
export const CircuitDetailedInfo = (): ReactElement => {
    const [intoType, setInfoType] = useState<DetailedInfoTab>(DetailedInfoTab.info);
    const currentSelectedCircuit = useSelector(selectCurrentCircuit);
    const loadingCircuits = useAppSelector(s => s.circuitsState.isLoading);

    return (
        <DashboardCard className={styles.container}>
            <Details title={<h4>Circuit detailed info</h4>}>
                <Nav
                    justified
                    className={styles.toolbar}
                >
                    {Object.values(DetailedInfoTab).map(t => (
                        <Nav.Item
                            key={t}
                            onClick={() => setInfoType(t)}
                            active={t === intoType}
                        >
                            {t.toUpperCase()}
                        </Nav.Item>
                    ))}
                </Nav>
                {currentSelectedCircuit && (
                    <div className={styles.imageContainer}>
                        <Image
                            alt="Circuit image"
                            source={getCurrencyImage(currentSelectedCircuit.name)}
                            responsive
                        />
                    </div>
                )}
                <div className={styles.content}>
                    {currentSelectedCircuit ? (
                        <CircuitDetailedInfoFactory
                            type={intoType}
                            circuit={currentSelectedCircuit}
                        />
                    ) : loadingCircuits ? (
                        <Spinner grow />
                    ) : (
                        <div>Nothing is selected.</div>
                    )}
                </div>
            </Details>
        </DashboardCard>
    );
};

/**
 *Renders Circuit info conditionally.
 *
 * @param {{type: DetailedInfoTab; circuit: Circuit;}} props Props.
 * @returns React element.
 */
const CircuitDetailedInfoFactory = ({
    type,
    circuit,
}: {
    type: DetailedInfoTab;
    circuit: Circuit;
}): ReactElement => {
    switch (type) {
        case DetailedInfoTab.info:
            return (
                <>
                    <CircuitInfoCard circuit={circuit} />
                    <CircuitJsonView circuit={circuit} />
                </>
            );
        case DetailedInfoTab.stats:
            return <CircuitStatsCard circuitId={circuit.id} />;
        default:
            return <></>;
    }
};
