/**
 * @file React component.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

import { ReactElement } from 'react';
import { Icon } from '@nilfoundation/react-components';
import { ColumnInstance } from 'react-table';

/**
 * Props.
 */
type OrderBookTableHeaderProps = {
    column: ColumnInstance;
};

/**
 * Order book table header.
 *
 * @param {OrderBookTableHeaderProps} props Props.
 * @returns React component.
 */
export const OrderBookTableHeader = ({ column }: OrderBookTableHeaderProps): ReactElement => {
    const { canSort, isSorted, isSortedDesc, toggleSortBy } = column;

    return (
        <th
            {...column.getHeaderProps(column.getSortByToggleProps())}
            className={canSort ? 'sortableColumn' : ''}
            tabIndex={canSort ? 0 : undefined}
            onKeyDown={() => toggleSortBy()}
        >
            {column.render('Header')}
            {isSorted && <Icon iconName={`fa-solid fa-angle-${isSortedDesc ? 'down' : 'up'}`} />}
        </th>
    );
};
