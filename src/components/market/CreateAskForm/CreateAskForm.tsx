/**
 * @file React component.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

import { ReactElement, useState, useContext } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { Form, notificationActions, Variant } from '@nilfoundation/react-components';
import { CreateAsk } from 'src/models';
import { AddAsk, useAppSelector } from 'src/redux';
import { createAsk } from 'src/api/market/AsksApi';
import { OrderManagementContext } from '../OrderManagementContextProvider';
import { CreateTradeOrderForm } from '../CreateTradeOrderForm';

/**
 * Create ask form.
 *
 * @returns React component.
 */
export const CreateAskForm = (): ReactElement => {
    const { setProcessing } = useContext(OrderManagementContext);
    const user = useAppSelector(s => s.userState.user)!;
    const selectedCircuitId = useAppSelector(s => s.circuitsState.selectedid);
    const dispatch = useDispatch();
    const [errorMessage, setErrorMessage] = useState('');
    const form = useForm<CreateAsk>({
        mode: 'onChange',
        defaultValues: {
            sender: user,
            circuit_id: selectedCircuitId,
            wait_period: 86400000,
        },
    });

    const onSubmitAsk = form.handleSubmit(async (data: CreateAsk): Promise<void> => {
        setErrorMessage('');
        setProcessing(true);
        try {
            const ask = await createAsk(data);
            dispatch(AddAsk(ask));
            notificationActions?.create({
                title: 'Order successfully created',
                message: `Cost: ${data.cost}, eval_time: ${data.eval_time}`,
                variant: Variant.success,
            });
            form.reset();
        } catch (e) {
            setErrorMessage(`Create order error`);
        } finally {
            setProcessing(false);
        }
    });

    return (
        <Form>
            <FormProvider {...form}>
                <CreateTradeOrderForm
                    onSubmit={onSubmitAsk}
                    errorMessage={errorMessage}
                />
            </FormProvider>
        </Form>
    );
};
