/**
 * @file React component.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

import { CSSProperties, KeyboardEventHandler, ReactElement, useContext } from 'react';
import { Row } from 'react-table';
import { OrderBookTableData } from 'src/models';
import { OrderManagementContext } from '../OrderManagementContextProvider';
import { OrderBookTableCell } from './OrderBookTableCell';

/**
 * Props.
 */
type OrderBookTableRowProps = {
    row: Row<OrderBookTableData>;
    className?: string;
};

/**
 * Order book table row.
 *
 * @param {OrderBookTableRowProps} props Props.
 * @returns React component.
 */
export const OrderBookTableRow = ({
    row,
    className: propsClassName,
}: OrderBookTableRowProps): ReactElement => {
    const { setSelectedValues } = useContext(OrderManagementContext);
    const onClickRow = () => {
        setSelectedValues({
            cost: row.values.cost,
            eval_time: row.values.eval_time,
        });
    };

    const onKeyDownHandler: KeyboardEventHandler = e => {
        if (e.key !== 'Enter' && e.key !== ' ') {
            return;
        }

        e.preventDefault();
        onClickRow();
    };

    const { className, style, ...rest } = row.getRowProps();
    const combinedStyle = { ...style, '--bar-width': `${row.values.volume}%` } as CSSProperties;
    const combinedClassName = `${className ?? ''} ${propsClassName ?? ''}`;

    return (
        <tr
            {...rest}
            onClick={onClickRow}
            onKeyDown={onKeyDownHandler}
            tabIndex={0}
            style={combinedStyle}
            className={combinedClassName}
        >
            {row.cells.map(cell => {
                const { key } = cell.getCellProps();
                return (
                    <OrderBookTableCell
                        key={key}
                        cell={cell}
                    />
                );
            })}
        </tr>
    );
};
