/**
 * @file React component.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

import { ReactElement, ReactNode, useEffect } from 'react';
import {
    Column,
    ColumnInstance,
    Row,
    TableState,
    useFilters,
    useSortBy,
    useTable,
} from 'react-table';
import { notEmpty } from 'src/utils';
import { useDebounce, useInitialTableState } from 'src/hooks';
import { ReactTableHeader } from './ReactTableHeader';
import { Table, TBody, THead, TRow } from '../Table';

/**
 * Props.
 */
type ReactTableProps<T extends Record<string, unknown>> = {
    name: string;
    data: T[];
    columns: ReadonlyArray<Column<T>>;
    renderRows: (rows: Row<T>[], prepareRow: (row: Row<T>) => void) => ReactNode;
    initialState?: Partial<TableState<T>>;
    className?: string;
    reversed?: boolean;
};

/**
 * React-table hook list to pass into table instance.
 */
const tableHooks = [useFilters, useSortBy].filter(notEmpty);

/**
 * React table template.
 *
 * @param {ReactTableProps} props Props.
 * @returns React component.
 */
export const ReactTable = <T extends Record<string, unknown>>({
    name,
    columns,
    data,
    renderRows,
    initialState: defaultInitialState,
    className,
    reversed,
}: ReactTableProps<T>): ReactElement => {
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
        <Table className={className}>
            {!reversed && renderTableHead(visibleColumns)}
            <TBody {...getTableBodyProps()}>{renderRows(rows, prepareRow)}</TBody>
            {reversed && renderTableHead(visibleColumns)}
        </Table>
    );
};

/**
 * Renders table head.
 *
 * @param columns Table columns.
 * @returns Table head.
 */
const renderTableHead = <T extends Record<string, unknown>>(columns: ColumnInstance<T>[]) => (
    <THead sticky>
        <TRow>
            {columns.map(column => (
                <ReactTableHeader
                    key={column.id}
                    column={column}
                />
            ))}
        </TRow>
    </THead>
);
