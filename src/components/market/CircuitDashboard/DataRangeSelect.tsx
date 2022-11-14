/**
 * @file React component.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

import { ReactElement } from 'react';
import { Nav } from '@nilfoundation/react-components';
import { DateUnit } from 'src/enums';

/**
 * Props.
 */
type DataRangeSelectProps = {
    currentDataRange?: DateUnit;
    setDataRange: (u: DateUnit) => void;
    disabled: boolean;
};

/**
 * Chart template toolbar.
 *
 * @param {DataRangeSelectProps} props Props.
 * @returns React component.
 */
export const DataRangeSelect = ({
    currentDataRange,
    setDataRange,
    disabled,
}: DataRangeSelectProps): ReactElement => {
    return (
        <Nav>
            {Object.values(DateUnit).map(x => (
                <Nav.Item
                    key={x}
                    active={currentDataRange === x}
                    onClick={() => setDataRange(x)}
                    disabled={disabled}
                >
                    {x}
                </Nav.Item>
            ))}
        </Nav>
    );
};
