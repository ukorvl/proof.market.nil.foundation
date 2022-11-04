/**
 * @file React component.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

import { ReactElement, ReactNode, useEffect } from 'react';
import { Column, Row, TableState, useSortBy, useTable } from 'react-table';
import { Table } from '@nilfoundation/react-components';
import { notEmpty, genericMemo } from 'src/utils';
import { useDebounce, useInitialTableState } from 'src/hooks';
import { ReactTableHeader } from './ReactTableHeader';
import './ReactTable.scss';

/**
 * Props.
 * Don't forget to memoize all non-primitive values.
 */
type ReactTableProps<T extends Record<string, unknown>> = {
    name: string;
    data: T[];
    columns: ReadonlyArray<Column<T>>;
    renderRows: (rows: Row<T>[], prepareRow: (row: Row<T>) => void) => ReactNode;
    initialState?: Partial<TableState<T>>;
    className?: string;
};

/**
 * React-table hook list to pass into table instance.
 */
const tableHooks = [useSortBy].filter(notEmpty);

/**
 * React table template.
 *
 * @param {ReactTableProps} props Props.
 * @returns React component.
 */
export const ReactTable = genericMemo(function ReactTable<T extends Record<string, unknown>>({
    name,
    columns,
    data,
    renderRows,
    initialState: defaultInitialState,
    className,
}: ReactTableProps<T>): ReactElement {
    const [initialState, setInitialState] = useInitialTableState(name, defaultInitialState);

    const { getTableBodyProps, visibleColumns, rows, prepareRow, state } = useTable<T>(
        { columns, data, initialState },
        ...tableHooks,
    );

    const debouncedState = useDebounce(state, 500);

    useEffect(() => {
        setInitialState(debouncedState);
    }, [setInitialState, debouncedState]);

    return (
        <Table
            className={`styledTable ${className ?? ''}`}
            condensed
            responsive
        >
            <thead>
                <tr>
                    {visibleColumns.map(column => (
                        <ReactTableHeader
                            key={column.id}
                            column={column}
                        />
                    ))}
                </tr>
            </thead>
            <tbody {...getTableBodyProps()}>{renderRows(rows, prepareRow)}</tbody>
        </Table>
    );
});
