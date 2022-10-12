/**
 * @file React component.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

import { ReactElement } from 'react';
import { useSelector } from 'react-redux';
import ReactJson from 'react-json-view';
import { Icon } from '@nilfoundation/react-components';
import { selectCurrentCircuit } from 'src/redux';
import { jsonViewerTheme } from 'src/constants';
import { DashboardCard } from '../DashboardCard';
import { Details } from '../../common';
import './CircuitDetailedInfo.scss';

/**
 * Currencies list.
 *
 * @returns React component.
 */
export const CircuitDetailedInfo = (): ReactElement => {
    const currentSelectedCircuit = useSelector(selectCurrentCircuit);

    const renderTitle = () =>
        currentSelectedCircuit && (
            <div className="detailedTitle">
                <h4>
                    {`${currentSelectedCircuit.name} (${currentSelectedCircuit.describe})`} info
                </h4>
                <a href={currentSelectedCircuit.repository}>
                    <Icon
                        iconName="fa-brands fa-github"
                        srOnlyText="github repository link"
                    />
                </a>
            </div>
        );

    return (
        <DashboardCard>
            <Details title={renderTitle()}>
                {currentSelectedCircuit ? (
                    <ReactJson
                        src={currentSelectedCircuit}
                        collapsed={1}
                        name={null}
                        displayDataTypes={false}
                        theme={jsonViewerTheme}
                    />
                ) : (
                    <div>Nothing is selected.</div>
                )}
            </Details>
        </DashboardCard>
    );
};
