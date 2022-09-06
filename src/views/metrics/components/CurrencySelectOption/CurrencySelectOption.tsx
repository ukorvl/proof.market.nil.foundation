import { ReactElement } from "react";
import { SelectOption, SelectOptionProps } from "@nilfoundation/react-components";
import { Currency } from "../../enums";
import './CurrencySelectOption.scss'

type CurrencySelectOptionProps = {
    imageSrc?: string;
} & SelectOptionProps<Currency>

export const CurrencySelectOption = ({
    title,
    value,
    imageSrc,
    disabled,
    defaultSelected
}: CurrencySelectOptionProps): ReactElement => {
    return (
        <SelectOption
            value={value}
            title={title}
            disabled={disabled}
            defaultSelected={defaultSelected}
        >
            <div className="metricsViewSelectOption">
                <img
                    src={imageSrc}
                    alt={title}
                    className={disabled ? 'disabled' : ''}
                />
                {title}
            </div>
        </SelectOption>
    );
};
