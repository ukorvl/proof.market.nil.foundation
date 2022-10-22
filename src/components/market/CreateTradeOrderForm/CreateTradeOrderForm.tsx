/**
 * @file React component.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

import { ReactElement, useContext, useRef, useState } from 'react';
import { useForm, Controller, useFormContext } from 'react-hook-form';
import { CSSTransition } from 'react-transition-group';
import { Button, Form, Input, Size, Spinner, Variant } from '@nilfoundation/react-components';
import { CreateTradeOrder } from 'src/models';

/**
 * Props.
 */
type CreateTradeOrderFormProps = {
    onSubmit: () => Promise<void>;
    errorMessage: string;
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
}: CreateTradeOrderFormProps): ReactElement => {
    const nodeRef = useRef(null);
    const {
        register,
        formState: { isSubmitting, isValid, errors },
    } = useFormContext<CreateTradeOrder>();

    return (
        <>
            <Form.Group hasError={!!errors['cost']}>
                <Form.Label htmlFor="cost">Cost</Form.Label>
                <Input
                    type="number"
                    id="cost"
                    {...register('cost', { required: true })}
                />
            </Form.Group>
            <Form.Group hasError={!!errors['eval_time']}>
                <Form.Label htmlFor="eval_time">Eval time</Form.Label>
                <Input
                    type="number"
                    id="eval_time"
                    {...register('eval_time', { required: true })}
                />
            </Form.Group>
            <Form.Group hasError={!!errors['wait_period']}>
                <Form.Label htmlFor="wait_period">Wait period</Form.Label>
                <Input
                    type="number"
                    id="wait_period"
                    {...register('wait_period', { required: true })}
                />
            </Form.Group>
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
        </>
    );
};
