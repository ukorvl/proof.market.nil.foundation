/* eslint-disable jsdoc/require-jsdoc */
/**
 * @file Typings.
 * @copyright Yury Korotovskikh <u.korotovskiy@nil.foundation>
 */

import type { MouseEventHandler } from 'react';
import type {
    TableInstance,
    UseColumnOrderInstanceProps,
    UseColumnOrderState,
    UseExpandedHooks,
    UseExpandedInstanceProps,
    UseExpandedOptions,
    UseExpandedRowProps,
    UseExpandedState,
    UseFiltersColumnOptions,
    UseFiltersColumnProps,
    UseFiltersInstanceProps,
    UseFiltersOptions,
    UseFiltersState,
    UseGlobalFiltersInstanceProps,
    UseGlobalFiltersOptions,
    UseGlobalFiltersState,
    UseGroupByCellProps,
    UseGroupByColumnOptions,
    UseGroupByColumnProps,
    UseGroupByHooks,
    UseGroupByInstanceProps,
    UseGroupByOptions,
    UseGroupByRowProps,
    UseGroupByState,
    UsePaginationInstanceProps,
    UsePaginationOptions,
    UsePaginationState,
    UseResizeColumnsColumnOptions,
    UseResizeColumnsColumnProps,
    UseResizeColumnsOptions,
    UseResizeColumnsState,
    UseRowSelectHooks,
    UseRowSelectInstanceProps,
    UseRowSelectOptions,
    UseRowSelectRowProps,
    UseRowSelectState,
    UseSortByColumnOptions,
    UseSortByColumnProps,
    UseSortByHooks,
    UseSortByInstanceProps,
    UseSortByOptions,
    UseSortByState,
} from 'react-table';

declare module 'react-table' {
    export interface UseFlexLayoutInstanceProps {
        totalColumnsMinWidth: number;
    }

    export interface UseFlexLayoutColumnProps {
        totalMinWidth: number;
    }

    export interface TableOptions<D extends Record<string, unknown>>
        extends UseExpandedOptions<D>,
            UseFiltersOptions<D>,
            UseFiltersOptions<D>,
            UseGlobalFiltersOptions<D>,
            UseGroupByOptions<D>,
            UsePaginationOptions<D>,
            UseResizeColumnsOptions<D>,
            UseRowSelectOptions<D>,
            UseSortByOptions<D> {}

    export interface Hooks<D extends Record<string, unknown> = Record<string, unknown>>
        extends UseExpandedHooks<D>,
            UseGroupByHooks<D>,
            UseRowSelectHooks<D>,
            UseSortByHooks<D> {}

    export interface TableInstance<D extends Record<string, unknown> = Record<string, unknown>>
        extends UseColumnOrderInstanceProps<D>,
            UseExpandedInstanceProps<D>,
            UseFiltersInstanceProps<D>,
            UseGlobalFiltersInstanceProps<D>,
            UseGroupByInstanceProps<D>,
            UsePaginationInstanceProps<D>,
            UseRowSelectInstanceProps<D>,
            UseFlexLayoutInstanceProps<D>,
            UsePaginationInstanceProps<D>,
            UseSortByInstanceProps<D> {}

    export interface TableState<D extends Record<string, unknown> = Record<string, unknown>>
        extends UseColumnOrderState<D>,
            UseExpandedState<D>,
            UseFiltersState<D>,
            UseGlobalFiltersState<D>,
            UseGroupByState<D>,
            UsePaginationState<D>,
            UseResizeColumnsState<D>,
            UseRowSelectState<D>,
            UseSortByState<D> {
        rowCount: number;
    }

    export interface ColumnInterface<D extends Record<string, unknown> = Record<string, unknown>>
        extends UseFiltersColumnOptions<D>,
            UseGroupByColumnOptions<D>,
            UseResizeColumnsColumnOptions<D>,
            UseSortByColumnOptions<D> {
        align?: string;
    }

    export interface ColumnInstance<D extends Record<string, unknown> = Record<string, unknown>>
        extends UseFiltersColumnProps<D>,
            UseGroupByColumnProps<D>,
            UseResizeColumnsColumnProps<D>,
            UseFlexLayoutColumnProps<D>,
            UseSortByColumnProps<D> {}

    export type Cell<D extends Record<string, unknown> = Record<string, unknown>> =
        UseGroupByCellProps<D>;

    export interface Row<D extends Record<string, unknown> = Record<string, unknown>>
        extends UseExpandedRowProps<D>,
            UseGroupByRowProps<D>,
            UseRowSelectRowProps<D> {}

    export interface TableCommonProps {
        title?: string;
        'aria-label'?: string;
    }

    export interface TableSortByToggleProps {
        title?: string;
    }

    export interface TableGroupByToggleProps {
        title?: string;
    }
}

export type TableMouseEventHandler<T extends Record<string, unknown>> = (
    instance: TableInstance<T>,
) => MouseEventHandler;
