/**
 * @file React component.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

import { ReactElement, useState, useContext } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { notificationActions, Variant } from '@nilfoundation/react-components';
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
    const user = useAppSelector(s => s.userState.name)!;
    const selectedCircuitId = useAppSelector(s => s.circuitsState.selectedid);
    const dispatch = useDispatch();
    const [errorMessage, setErrorMessage] = useState('');
    const form = useForm<CreateAsk>({
        mode: 'onChange',
        defaultValues: {
            sender: user,
            statement_key: selectedCircuitId,
        },
    });

    const onSubmitAsk = form.handleSubmit(async (data: CreateAsk): Promise<void> => {
        setErrorMessage('');
        setProcessing(true);
        try {
            const ask = await createAsk(data);
            dispatch(AddAsk(ask));

            const { cost, eval_time } = data;

            notificationActions?.create({
                title: 'Order successfully created',
                message: `Cost: ${cost}${eval_time ? `, eval_time: ${eval_time}` : ''}`,
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
        <FormProvider {...form}>
            <CreateTradeOrderForm
                onSubmit={onSubmitAsk}
                errorMessage={errorMessage}
            />
        </FormProvider>
    );
};
