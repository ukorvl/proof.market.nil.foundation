/**
 * @file React functional component.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

import React, { ReactElement, useRef, useState } from 'react';
import { Size } from '../../enums';
import clsx from 'clsx';
import { InputGroup, Input } from '@nilfoundation/react-components';
import { Menu } from '../Menu';
import { SelectOption, SelectOptionProps } from './SelectOption';
import { SelectOptionModel } from './SelectOptionModel';
import { uniqueId } from 'lodash';
import { SelectContext } from './SelectContext';
import { Icon } from '../Icon';
import './Select.scss';

/**
 * Props.
 */
export interface SelectProps<T> {
    children: ReactElement<SelectOptionProps<T>>[] | ReactElement<SelectOptionProps<T>>;
    onSelect?: (value: T) => void;
    size?: Size;
    className?: string;
    noItemsMessage?: string;
    placeholder?: string;
    disabled?: boolean;
    id?: string;
    clearable?: boolean;
}

/**
 * Select component.
 *
 * @param {SelectProps} props - Props.
 * @returns - React component.
 */
export const Select = <T extends unknown>({
    className,
    onSelect,
    size = Size.md,
    children,
    noItemsMessage = 'No items to select',
    placeholder = 'No items selected',
    disabled,
    id,
    clearable
}: SelectProps<T>): ReactElement => {
    const ref = useRef<HTMLInputElement>(null);
    const refId = useRef(uniqueId('select-'));
    const selectId = id ?? refId.current;
    const selectClassName = clsx(
        'select',
        className && className
    );

    const [dropdownVisible, setDropdownVisible] = useState(false);
    const [selected, setSelected] = useState<SelectOptionModel<T>>();
    const iconName = `angle-${dropdownVisible ? 'up' : 'down'}`;

    const clearSelect = (): void => {
        if (!ref.current) {
            return;
        }

        if (clearable) {
            return;
        }

        if (disabled) {
            return;
        }

        setDropdownVisible(false);
        setSelected(undefined);
    };

    const onSelectOption = (selectOption: SelectOptionModel<T>): void => {
        if (disabled) {
            return;
        }

        setSelected(selectOption);
        onSelect && onSelect(selectOption.value);
        setDropdownVisible(false);
    };

    return (
        <SelectContext.Provider value={{selected, onSelectOption}}>
            <div className={selectClassName}>
                <InputGroup size={size}>
                    <Input
                        role="select"
                        readOnly
                        ref={ref}
                        id={selectId}
                        value={selected?.title ?? ''}
                        disabled={disabled}
                        placeholder={placeholder}
                    />
                    {
                        clearable && selected &&
                            <InputGroup.Icon
                                iconName="times"
                                onClick={clearSelect}
                            />
                    }
                    <InputGroup.Button
                        onClick={():void => setDropdownVisible(!dropdownVisible)}
                    >
                        <Icon iconName={iconName} />
                    </InputGroup.Button>
                </InputGroup>
                <Menu
                    visible={dropdownVisible}
                    onCloseMenu={():void => setDropdownVisible(false)}
                    labeledBy={selectId}>
                        {!children && noItemsMessage}
                        {children}
                </Menu>
            </div>
        </SelectContext.Provider>
    );
};

/**
 * Component extensions.
 */
Select.Option = SelectOption;
