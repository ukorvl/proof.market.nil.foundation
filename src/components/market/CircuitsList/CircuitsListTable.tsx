/**
 * @file React component.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

import { ReactElement, memo, useCallback, useMemo, useRef, useState } from 'react';
import { FilterProps, TableInstance, TableState } from 'react-table';
import { Icon, Input, InputGroup, ListGroup } from '@nilfoundation/react-components';
import { dequal as deepEqual } from 'dequal';
import debounce from 'lodash/debounce';
import { useAppSelector } from 'src/redux';
import { Circuit, CircuitsListData, CircuitsListTableColumn } from 'src/models';
import { ReactTable } from 'src/components';
import { CurcuitsListItem } from './CircuitsListItem';

/**
 * Props.
 */
type CircuitsListTableProps = {
    circuitsList: Circuit[];
};

/**
 * Search by text input.
 *
 * @param {FilterProps<CircuitsListData>} props - Filter props.
 * @returns Search by text filter input.
 */
const ByTextColumnFilter = ({ column: { setFilter } }: FilterProps<CircuitsListData>) => {
    const [value, setValue] = useState('');
    const debouncedSearch = useRef(
        debounce(value => {
            setFilter(value || undefined);
        }, 300),
    ).current;

    return (
        <InputGroup>
            <InputGroup.Addon>
                <Icon iconName="fa-solid fa-search" />
            </InputGroup.Addon>
            <Input
                placeholder="Search circuits"
                type="text"
                value={value}
                onChange={e => {
                    setValue(e.target.value);
                    debouncedSearch(e.target.value);
                }}
            />
        </InputGroup>
    );
};

/**
 * Table columns.
 */
const columns: CircuitsListTableColumn[] = [
    {
        Header: 'Name',
        accessor: 'name',
        Filter: ByTextColumnFilter,
    },
    {
        accessor: 'cost',
        disableFilters: true,
    },
    {
        accessor: 'change',
        disableFilters: true,
    },
    {
        accessor: 'id',
        disableFilters: true,
    },
];

/**
 * Initial table state without user interactions.
 */
const defaultTableState: Partial<TableState<CircuitsListData>> = {
    sortBy: [
        {
            id: 'name',
            desc: false,
        },
    ],
    hiddenColumns: ['change', 'cost', 'id'],
};

/**
 * Active orders table.
 *
 * @param {CircuitsListTableProps} props Props.
 * @returns React component.
 */
export const CircuitsListTable = memo(function CircuitsListTable({
    circuitsList,
}: CircuitsListTableProps): ReactElement {
    const circuitsInfo = useAppSelector(s => s.circuitsState.circuitsInfo, deepEqual);

    const tableData: CircuitsListData[] = useMemo(() => {
        return circuitsList.map(x => {
            const info = circuitsInfo && circuitsInfo.find(y => y.circuit_id === x.id);

            return {
                id: x.id,
                name: `${x.name.toUpperCase()} (${x.info.toUpperCase()})/USD`,
                cost: info?.current_cost,
                change: info?.daily_change,
            };
        });
    }, [circuitsList, circuitsInfo]);

    const renderRows = useCallback(
        ({ rows, prepareRow, visibleColumns }: TableInstance<CircuitsListData>) => (
            <>
                {visibleColumns.find(x => x.canFilter)?.render('Filter')}
                <ListGroup>
                    {rows.map(row => {
                        prepareRow(row);
                        return (
                            <CurcuitsListItem
                                key={row.id}
                                data={row.values as CircuitsListData}
                            />
                        );
                    })}
                </ListGroup>
            </>
        ),
        [],
    );

    return (
        <ReactTable
            name="circuitsListTable"
            data={tableData}
            columns={columns}
            renderRows={renderRows}
            initialState={defaultTableState}
            showTableHeader={false}
        />
    );
});
