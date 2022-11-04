/**
 * @file React component.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

import { KeyboardEventHandler, ReactElement } from 'react';
import { Icon } from '@nilfoundation/react-components';
import { ColumnInstance } from 'react-table';

/**
 * Props.
 */
type ReactTableHeaderProps<T extends Record<string, unknown>> = {
    column: ColumnInstance<T>;
};

/**
 * React table header.
 *
 * @param {ReactTableHeaderProps} props Props.
 * @returns React component.
 */
export const ReactTableHeader = <T extends Record<string, unknown>>({
    column,
}: ReactTableHeaderProps<T>): ReactElement => {
    const { canSort, isSorted, isSortedDesc, toggleSortBy } = column;

    const onKeyDownHandler: KeyboardEventHandler = e => {
        if (e.key !== 'Enter' && e.key !== ' ') {
            return;
        }

        e.preventDefault();
        toggleSortBy();
    };

    return (
        <th
            {...column.getHeaderProps(column.getSortByToggleProps())}
            className={canSort ? 'sortableColumn' : ''}
            tabIndex={canSort ? 0 : undefined}
            onKeyDown={onKeyDownHandler}
        >
            {column.render('Header')}
            {isSorted && <Icon iconName={`fa-solid fa-angle-${isSortedDesc ? 'down' : 'up'}`} />}
        </th>
    );
};
