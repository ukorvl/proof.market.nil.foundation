/**
 * @file React component.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

import { ReactElement, useRef, useState } from 'react';
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
import { ProposalDto } from 'src/models';
import { AddProposal, useAppSelector } from 'src/redux';
import { createProposal } from 'src/api/market/ProposalsApi';

/**
 * Create proposal form.
 *
 * @returns React component.
 */
export const CreateProposalForm = (): ReactElement => {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const user = useAppSelector(s => s.userState.user)!;
    const selectedOrderId = useAppSelector(s => s.ordersState.selectedOrderId);
    const nodeRef = useRef(null);
    const dispatch = useDispatch();
    const [errorMessage, setErrorMessage] = useState('');
    const {
        register,
        handleSubmit,
        formState: { isSubmitting, isValid, errors },
    } = useForm<ProposalDto>({
        mode: 'onChange',
        defaultValues: {
            sender: user,
            order: selectedOrderId,
        },
    });

    const onSubmitProposal = handleSubmit(async (data: ProposalDto): Promise<void> => {
        setErrorMessage('');
        try {
            const proposal = await createProposal(data);
            console.log(proposal);
            dispatch(AddProposal(proposal));
        } catch (e) {
            setErrorMessage('Create proposal error');
        }
    });

    return (
        <Form>
            {selectedOrderId !== undefined ? (
                <>
                    <h5>Selected order: {selectedOrderId}</h5>
                    <Form.Group hasError={!!errors['bid']}>
                        <Form.Label htmlFor="bid">Bid</Form.Label>
                        <InputGroup>
                            <Input
                                type="number"
                                id="bid"
                                size={Size.lg}
                                {...register('bid', { required: true })}
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
                <h4>Please, select order to create proposals.</h4>
            )}
        </Form>
    );
};
