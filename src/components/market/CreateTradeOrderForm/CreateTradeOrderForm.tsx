/**
 * @file React component.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

import { ReactElement, ReactNode, useContext, useEffect, useRef } from 'react';
import { useFormContext } from 'react-hook-form';
import { CSSTransition } from 'react-transition-group';
import {
    Button,
    Input,
    Size,
    Spinner,
    Variant,
    Form,
    InputGroup,
} from '@nilfoundation/react-components';
import { CreateTradeOrder } from 'src/models';
import { OrderManagementContext } from '../OrderManagementContextProvider';
import { BaseFormGroup } from './BaseFormGroup';
import './CreateTradeOrderForm.scss';

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
        <Form className="createTradeOrderForm">
            <div className="formContent">
                <BaseFormGroup
                    hasError={!!errors['cost']}
                    labelText="Cost"
                    hintText="Proof cost"
                >
                    {props => (
                        <InputGroup>
                            <Input
                                type="number"
                                {...props}
                                {...register('cost', {
                                    required: true,
                                    min: 0,
                                    valueAsNumber: true,
                                })}
                            />
                            <InputGroup.Addon>USD</InputGroup.Addon>
                        </InputGroup>
                    )}
                </BaseFormGroup>
                <BaseFormGroup
                    hasError={!!errors['eval_time']}
                    labelText="Generation time"
                    hintText="Proof generation time"
                >
                    {props => (
                        <InputGroup>
                            <Input
                                type="number"
                                {...props}
                                {...register('eval_time', {
                                    required: true,
                                    min: 0,
                                    valueAsNumber: true,
                                })}
                            />
                            <InputGroup.Addon>Mins</InputGroup.Addon>
                        </InputGroup>
                    )}
                </BaseFormGroup>
                <BaseFormGroup
                    hasError={!!errors['wait_period']}
                    labelText="Order timeout"
                    hintText="Order cancellation time"
                >
                    {props => (
                        <InputGroup>
                            <Input
                                type="number"
                                {...props}
                                {...register('wait_period', {
                                    required: true,
                                    min: 0,
                                    valueAsNumber: true,
                                })}
                            />
                            <InputGroup.Addon>Mins</InputGroup.Addon>
                        </InputGroup>
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
