/**
 * @file React component.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

import { ReactElement, ReactNode, useEffect } from 'react';
import {
    Column,
    ColumnInstance,
    TableInstance,
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
    renderRows: (tableInstance: TableInstance<T>) => ReactNode;
    initialState?: Partial<TableState<T>>;
    className?: string;
    reversed?: boolean;
    showTableHeader?: boolean;
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
    showTableHeader = true,
}: ReactTableProps<T>): ReactElement => {
    const [initialState, setInitialState] = useInitialTableState(name, defaultInitialState);

    const tableInstance = useTable<T>({ columns, data, initialState }, ...tableHooks);
    const { getTableBodyProps, visibleColumns, state } = tableInstance;

    const debouncedState = useDebounce(state, 500);

    useEffect(() => {
        setInitialState(debouncedState);
    }, [setInitialState, debouncedState]);

    return (
        <Table className={className}>
            {!reversed && showTableHeader && renderTableHead(visibleColumns)}
            <TBody {...getTableBodyProps()}>{renderRows(tableInstance)}</TBody>
            {reversed && showTableHeader && renderTableHead(visibleColumns)}
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
