/**
 * @file React component.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

import { ReactElement, useRef, useState, useContext } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { CSSTransition } from 'react-transition-group';
import {
    Button,
    Form,
    Icon,
    Input,
    InputGroup,
    Size,
    Spinner,
    Variant,
} from '@nilfoundation/react-components';
import { CreateAsk } from 'src/models';
import { AddAsk, useAppSelector } from 'src/redux';
import { createProposal } from 'src/api/market/ProposalsApi';
import { OrderManagementPanelContext } from '../OrderManagementPanel';

/**
 * Create proposal form.
 *
 * @returns React component.
 */
export const CreateAskForm = (): ReactElement => {
    const { setProcessing } = useContext(OrderManagementPanelContext);
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
    } = useForm<CreateAsk>({
        mode: 'onChange',
        defaultValues: {
            sender: user,
            circuit_id: selectedCircuitId,
            wait_period: 1111,
        },
    });

    const onSubmitProposal = handleSubmit(async (data: CreateAsk): Promise<void> => {
        setErrorMessage('');
        setProcessing(true);
        try {
            const ask = await createProposal(data);
            dispatch(AddAsk(ask));
        } catch (e) {
            setErrorMessage('Create proposal error');
        } finally {
            setProcessing(false);
        }
    });

    return (
        <Form>
            {selectedCircuitId !== undefined ? (
                <>
                    <Form.Group hasError={!!errors['cost']}>
                        <Form.Label htmlFor="bid">Cost</Form.Label>
                        <InputGroup>
                            <Input
                                type="number"
                                id="bid"
                                size={Size.lg}
                                {...register('cost', { required: true })}
                            />
                            <InputGroup.Addon>
                                <Icon iconName="fa-solid fa-square-dollar" />
                            </InputGroup.Addon>
                        </InputGroup>
                    </Form.Group>
                    <Form.Group hasError={!!errors['eval_time']}>
                        <Form.Label htmlFor="eval_time">Eval_time</Form.Label>
                        <Input
                            type="number"
                            id="eval_time"
                            size={Size.lg}
                            {...register('eval_time', { required: true })}
                        />
                    </Form.Group>
                    <Button
                        variant={Variant.success}
                        onClick={onSubmitProposal}
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
                <h4>Please, select circuit to create orders.</h4>
            )}
        </Form>
    );
};
