/**
 * @file React component.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

import type { ReactElement } from 'react';
import { useContext, useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { notificationActions, Variant } from '@nilfoundation/react-components';
import { AddBid, useAppSelector } from 'src/redux';
import { createBid } from 'src/api/market/BidsApi';
import type { CreateBid } from 'src/models';
import { OrderManagementContext } from '../OrderManagementContextProvider';
import { CreateTradeOrderForm } from '../CreateTradeOrderForm';
import { PublicInput } from './PublicInput';

/**
 * Create bid form.
 *
 * @returns React component.
 */
export const CreateBidForm = (): ReactElement => {
    const { setProcessing } = useContext(OrderManagementContext);
    const selectedCircuitId = useAppSelector(s => s.circuitsState.selectedid);
    const dispatch = useDispatch();
    const [errorMessage, setErrorMessage] = useState('');
    const form = useForm<CreateBid>({
        mode: 'onChange',
        defaultValues: {
            statement_key: selectedCircuitId,
        },
    });

    const onSubmitBid = form.handleSubmit(async (data: CreateBid): Promise<void> => {
        setErrorMessage('');
        setProcessing(true);
        try {
            const bid = await createBid(data);
            dispatch(AddBid(bid));

            const { cost, eval_time } = data;

            notificationActions?.create({
                title: 'Order successfully created',
                message: `Cost: ${cost}${eval_time ? `, eval_time: ${eval_time}` : ''}`,
                variant: Variant.success,
            });
            form.reset();
        } catch (e) {
            setErrorMessage('Create order error');
        } finally {
            setProcessing(false);
        }
    });

    return (
        <FormProvider {...form}>
            <CreateTradeOrderForm
                onSubmit={onSubmitBid}
                errorMessage={errorMessage}
            >
                <PublicInput />
            </CreateTradeOrderForm>
        </FormProvider>
    );
};
