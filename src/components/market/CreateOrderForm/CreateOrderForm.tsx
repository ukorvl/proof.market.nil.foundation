/**
 * @file React component.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

import { ReactElement, useRef, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import ReactJson, { InteractionProps } from 'react-json-view';
import { useDispatch } from 'react-redux';
import { CSSTransition } from 'react-transition-group';
import { Button, Form, Input, Size, Spinner, Variant } from '@nilfoundation/react-components';
import { OrderDto } from 'src/models';
import { AddOrder, useAppSelector } from 'src/redux';
import { jsonViewerTheme } from 'src/constants';
import { createOrder } from 'src/api/market/OrdersApi';
import './CreateOrderForm.scss';

/**
 * Create order form.
 *
 * @returns React component.
 */
export const CreateOrderForm = (): ReactElement => {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const user = useAppSelector(s => s.userState.user)!;
    const selectedCircuitId = useAppSelector(s => s.circuitsState.selectedid);
    const nodeRef = useRef(null);
    const dispatch = useDispatch();
    const [errorMessage, setErrorMessage] = useState('');
    const {
        register,
        handleSubmit,
        formState: { isSubmitting, isValid, errors },
        control,
    } = useForm<OrderDto>({
        defaultValues: {
            sender: user,
            wait_period: 1111,
            circuit_id: '1',
        },
    });

    const onSubmitLogin = handleSubmit(async (data: OrderDto): Promise<void> => {
        setErrorMessage('');
        try {
            const order = await createOrder(data);
            console.log(order);
            dispatch(AddOrder(order));
        } catch (e) {
            setErrorMessage('Create order error');
        }
    });

    return (
        <Form className="createOrderForm">
            {true ? (
                <>
                    <Form.Group hasError={!!errors['wait_period']}>
                        <Form.Label htmlFor="wait_period">Wait period</Form.Label>
                        <Input
                            type="number"
                            id="wait_period"
                            size={Size.lg}
                            {...register('wait_period', { required: true })}
                        />
                    </Form.Group>
                    <Form.Group hasError={!!errors['public_input']}>
                        <Form.Label htmlFor="public_input">Public_input</Form.Label>
                        <Controller
                            name="public_input"
                            defaultValue={{}}
                            control={control}
                            render={({ field: { onChange, value } }) => (
                                <ReactJson
                                    src={value}
                                    enableClipboard
                                    onEdit={(edit: InteractionProps) => onChange(edit.updated_src)}
                                    onAdd={(add: InteractionProps) => onChange(add.updated_src)}
                                    onDelete={(del: InteractionProps) => onChange(del.updated_src)}
                                    displayDataTypes={false}
                                    theme={jsonViewerTheme}
                                />
                            )}
                        />
                    </Form.Group>
                    <Button
                        variant={Variant.success}
                        onClick={onSubmitLogin}
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
            ) : (
                <h4>Please, select circuit to make orders.</h4>
            )}
        </Form>
    );
};
