/**
 * @file React component.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

import { ReactElement, useRef, useState, useEffect } from 'react';
import {
    InputGroup,
    Icon,
    Input,
    Size,
    Button,
    Variant,
    Form,
    Spinner,
} from '@nilfoundation/react-components';
import { CSSTransition } from 'react-transition-group';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { RegisterData } from 'src/models';
import { Path } from 'src/routing';
import { SocialLinks } from 'src/components/common';
import { emailRegExp } from 'src/utils';
import { AuthCard } from '../AuthCard';
import styles from './RegisterForm.module.scss';

/**
 * Register form.
 *
 * @returns React component.
 */
export const RegisterForm = (): ReactElement => {
    const nodeRef = useRef(null);
    const emailInputRef = useRef<HTMLInputElement | null>(null);
    const [errorMessage, setErrorMessage] = useState<string>();

    const {
        register,
        formState: { isSubmitting, isValid, errors, isSubmitSuccessful },
        handleSubmit,
        reset,
    } = useForm<RegisterData>({
        mode: 'onChange',
        defaultValues: {
            to: process.env.REACT_APP_SITE_EMAIL,
        },
    });

    const onSubmitLogin = handleSubmit(async (data: RegisterData): Promise<void> => {
        setErrorMessage('');

        await axios
            .post(`${process.env.PUBLIC_URL}/contact/contact_me.php`, data)
            .then(response => {
                if (response.status >= 200 && response.status <= 399) {
                    reset();

                    return response;
                } else {
                    throw Error(response.statusText);
                }
            })
            .catch(() => setErrorMessage('Error while processing form.'));
    });

    useEffect(() => {
        emailInputRef.current && emailInputRef.current.focus();
    }, []);

    const { ref, ...restRegister } = register('email', { required: true, pattern: emailRegExp });

    return (
        <AuthCard>
            <Form className={styles.form}>
                <h4 className={styles.title}>Request your beta-test credentials via email</h4>
                <div className={`${styles.description} text-muted`}>
                    If you would like to get involved early, leave email below and we will let you
                    know when proof market opens!
                </div>
                <Form.Group hasError={!!errors['email']}>
                    <InputGroup
                        size={Size.lg}
                        className={styles.control}
                    >
                        <InputGroup.Addon>
                            <Icon iconName="fa-solid fa-at" />
                        </InputGroup.Addon>
                        <Input
                            type="email"
                            id="email"
                            aria-label="email"
                            placeholder="your email"
                            autoComplete="off"
                            {...restRegister}
                            ref={e => {
                                ref(e);
                                emailInputRef.current = e;
                            }}
                        />
                    </InputGroup>
                </Form.Group>
                <Button
                    block
                    variant={Variant.success}
                    size={Size.lg}
                    onClick={onSubmitLogin}
                    disabled={!isValid || isSubmitting}
                >
                    Submit
                    {isSubmitting && <Spinner />}
                </Button>
                <CSSTransition
                    classNames="fade"
                    timeout={300}
                    in={!!errorMessage}
                    unmountOnExit
                    nodeRef={nodeRef}
                >
                    <div
                        ref={nodeRef}
                        className="errorMessage"
                    >
                        {errorMessage}
                    </div>
                </CSSTransition>
                {isSubmitSuccessful && !errorMessage && <div>Thanks for registration!</div>}
                <div className={styles.social}>
                    <h5 className={styles.title}>
                        {
                            "Join our Discord's proof-market channel/Telegram for questions/to stay updated"
                        }
                    </h5>
                    <SocialLinks />
                </div>
                <div className={styles.successMessage}>
                    <Link to={Path.root}>Continue exploring</Link>
                </div>
                <div className="text-right">
                    <h5>
                        <span className="text-muted">{'Already have an account? '}</span>
                        <Link to={Path.login}>Sign in</Link>
                    </h5>
                </div>
            </Form>
        </AuthCard>
    );
};
