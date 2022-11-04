/**
 * @file React component.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

import { ReactElement, useContext, useState } from 'react';
import { useForm, Controller, FormProvider } from 'react-hook-form';
import ReactJson, { InteractionProps } from 'react-json-view';
import { useDispatch } from 'react-redux';
import { Form } from '@nilfoundation/react-components';
import { CreateBid } from 'src/models';
import { AddBid, useAppSelector } from 'src/redux';
import { jsonViewerTheme } from 'src/constants';
import { createBid } from 'src/api/market/BidsApi';
import { OrderManagementContext } from '../OrderManagementContextProvider';
import { CreateTradeOrderForm } from '../CreateTradeOrderForm';

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
            public_input: {},
        },
    });
    const {
        handleSubmit,
        formState: { errors },
        control,
    } = form;

    const onSubmitBid = handleSubmit(async (data: CreateBid): Promise<void> => {
        setErrorMessage('');
        setProcessing(true);
        try {
            const bid = await createBid(data);
            dispatch(AddBid(bid));
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
                    <Form.Group hasError={!!errors['public_input']}>
                        <Form.Label htmlFor="public_input">Public_input</Form.Label>
                        <Controller
                            name="public_input"
                            control={control}
                            render={({ field: { onChange, value } }) => (
                                <ReactJson
                                    src={value}
                                    collapsed={false}
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
                </CreateTradeOrderForm>
            </FormProvider>
        </Form>
    );
};
