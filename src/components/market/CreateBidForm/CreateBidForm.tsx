/**
 * @file React component.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

import { ReactElement, useContext, useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { Form, notificationActions, Variant } from '@nilfoundation/react-components';
import { CreateBid } from 'src/models';
import { AddBid, useAppSelector } from 'src/redux';
import { createBid } from 'src/api/market/BidsApi';
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
    const user = useAppSelector(s => s.userState.user)!;
    const selectedCircuitId = useAppSelector(s => s.circuitsState.selectedid);
    const dispatch = useDispatch();
    const [errorMessage, setErrorMessage] = useState('');
    const form = useForm<CreateBid>({
        mode: 'onChange',
        defaultValues: {
            sender: user,
            circuit_id: selectedCircuitId,
            wait_period: 86400000,
        },
    });

    const onSubmitBid = form.handleSubmit(async (data: CreateBid): Promise<void> => {
        setErrorMessage('');
        setProcessing(true);
        try {
            const bid = await createBid(data);
            dispatch(AddBid(bid));
            notificationActions?.create({
                title: 'Order successfully created',
                message: `Cost: ${data.cost}, eval_time: ${data.eval_time}`,
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
        <Form>
            <FormProvider {...form}>
                <CreateTradeOrderForm
                    onSubmit={onSubmitBid}
                    errorMessage={errorMessage}
                >
                    <PublicInput />
                </CreateTradeOrderForm>
            </FormProvider>
        </Form>
    );
};
