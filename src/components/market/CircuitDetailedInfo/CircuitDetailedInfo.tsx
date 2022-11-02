/**
 * @file React component.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

import { ReactElement } from 'react';
import { useSelector } from 'react-redux';
import ReactJson from 'react-json-view';
import { Icon, Image, Label, Spinner } from '@nilfoundation/react-components';
import { selectCurrentCircuit, useAppSelector } from 'src/redux';
import { jsonViewerTheme } from 'src/constants';
import { getCurrencyImage } from 'src/enums';
import { Details, DashboardCard } from '../../common';
import './CircuitDetailedInfo.scss';

/**
 * Currencies list.
 *
 * @returns React component.
 */
export const CircuitDetailedInfo = (): ReactElement => {
    const currentSelectedCircuit = useSelector(selectCurrentCircuit);
    const loadingCircuits = useAppSelector(s => s.circuitsState.isLoading);

    return (
        <DashboardCard>
            <Details title={<h4>Circuit detailed info</h4>}>
                {currentSelectedCircuit ? (
                    <div className="circuitDetailedInfo">
                        <h4>{`${currentSelectedCircuit.name} (${currentSelectedCircuit.info})/USD`}</h4>
                        <div className="circuitDetailedInfo__imageContainer">
                            <Image
                                alt="Circuit image"
                                source={getCurrencyImage(currentSelectedCircuit.name)}
                                responsive
                            />
                        </div>
                        <h5 className="text-muted">{currentSelectedCircuit.description}</h5>
                        <p>
                            <Label
                                href={currentSelectedCircuit.repository}
                                target="_blank"
                            >
                                <Icon
                                    iconName="fa-brands fa-github"
                                    srOnlyText="github repository link"
                                />
                                GitHub Repository
                            </Label>
                        </p>
                        <ReactJson
                            src={currentSelectedCircuit}
                            collapsed={1}
                            name={null}
                            displayDataTypes={false}
                            displayObjectSize={false}
                            theme={jsonViewerTheme}
                        />
                    </div>
                ) : loadingCircuits ? (
                    <Spinner grow />
                ) : (
                    <div>Nothing is selected.</div>
                )}
            </Details>
        </DashboardCard>
    );
};
