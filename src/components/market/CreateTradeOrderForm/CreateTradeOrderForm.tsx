/**
 * @file React component.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

import { ReactElement, ReactNode, useContext, useEffect, useRef } from 'react';
import { useFormContext } from 'react-hook-form';
import { CSSTransition } from 'react-transition-group';
import { Button, Input, Size, Spinner, Variant, Form } from '@nilfoundation/react-components';
import { CreateTradeOrder } from 'src/models';
import { OrderManagementContext } from '../OrderManagementContextProvider';
import { BaseFormGroup } from './BaseFormGroup';

/**
 * Props.
 */
type CreateTradeOrderFormProps = {
    onSubmit: () => Promise<void>;
    errorMessage: string;
    children?: ReactNode;
};

/**
 * Create trade order form.
 *
 * @param {CreateTradeOrderFormProps} props Props.
 * @returns React component.
 */
export const CreateTradeOrderForm = ({
    onSubmit,
    errorMessage,
    children,
}: CreateTradeOrderFormProps): ReactElement => {
    const nodeRef = useRef(null);
    const { selectedValues, setSelectedValues } = useContext(OrderManagementContext);
    const {
        register,
        setValue,
        formState: { isSubmitting, isValid, errors },
    } = useFormContext<CreateTradeOrder>();

    useEffect(() => {
        if (!selectedValues) {
            return;
        }

        const setValueOpts = { shouldDirty: true, shouldValidate: true };
        setValue('cost', selectedValues.cost, setValueOpts);
        setValue('eval_time', selectedValues.eval_time, setValueOpts);
        setSelectedValues(undefined);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedValues]);

    return (
        <Form>
            <div className="formContent">
                <BaseFormGroup
                    id="cost"
                    hasError={!!errors['cost']}
                    labelText="Cost, $"
                    hintText="Cost of proof generation"
                >
                    {id => (
                        <Input
                            type="number"
                            id={id}
                            {...register('cost', { required: true, min: 0, valueAsNumber: true })}
                        />
                    )}
                </BaseFormGroup>
                <BaseFormGroup
                    id="eval_time"
                    hasError={!!errors['eval_time']}
                    labelText="Generation time, ms"
                    hintText="Time that proof generation takes"
                >
                    {id => (
                        <Input
                            type="number"
                            id={id}
                            {...register('eval_time', {
                                required: true,
                                min: 0,
                                valueAsNumber: true,
                            })}
                        />
                    )}
                </BaseFormGroup>
                <BaseFormGroup
                    id="wait_period"
                    hasError={!!errors['wait_period']}
                    labelText="Timeout, ms"
                    hintText="Time that your order should wait for a match"
                >
                    {id => (
                        <Input
                            type="number"
                            id={id}
                            {...register('wait_period', {
                                required: true,
                                min: 0,
                                valueAsNumber: true,
                            })}
                        />
                    )}
                </BaseFormGroup>
                {children}
            </div>
            <Button
                variant={Variant.success}
                onClick={onSubmit}
                size={Size.lg}
                disabled={!isValid || isSubmitting}
            >
                Submit
                {isSubmitting && <Spinner />}
            </Button>
            <CSSTransition
                classNames="fade"
                timeout={300}
                in={!!errorMessage}
                nodeRef={nodeRef}
            >
                <div
                    ref={nodeRef}
                    className="errorMessage"
                >
                    {errorMessage}
                </div>
            </CSSTransition>
        </Form>
    );
};
