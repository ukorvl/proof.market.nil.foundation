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
    notificationActions,
} from '@nilfoundation/react-components';
import { Link, Navigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
//import debounce from 'lodash/debounce';
import { Path } from 'src/routing';
import { SocialLinks } from 'src/components';
import { emailRegExp } from 'src/utils';
import { RegisterData } from 'src/models';
import { signUp } from 'src/api';
import { AuthCard } from '../AuthCard';
import styles from './RegisterForm.module.scss';

/**
 * Register form.
 *
 * @returns React component.
 */
export const RegisterForm = (): ReactElement => {
    const userNameInputRef = useRef<HTMLInputElement | null>(null);
    const [errorMessage, setErrorMessage] = useState<string>();
    const {
        handleSubmit,
        register,
        formState: { isSubmitting, errors, isSubmitSuccessful, isValid },
    } = useForm<RegisterData>();

    // const debouncedOnChangeHandler = useRef(
    //     debounce((e: ChangeEvent<HTMLInputElement>) => {
    //         setEmail(e.target.value);
    //     }, 180),
    // ).current;

    const onSubmitLogin = handleSubmit(async (data: RegisterData): Promise<void> => {
        setErrorMessage('');
        try {
            await signUp(data);

            notificationActions?.create({
                title: 'Registration success',
                message: `Successfully register as ${data.username}`,
                variant: Variant.success,
            });
        } catch (e) {
            setErrorMessage('Register error');
        }
    });

    useEffect(() => {
        userNameInputRef.current && userNameInputRef.current.focus();
    }, []);

    const { ref, ...restRegister } = register('username', { required: true });

    if (isSubmitSuccessful) {
        return (
            <Navigate
                replace
                to={Path.login}
            />
        );
    }

    return (
        <AuthCard>
            <Form className={styles.form}>
                <h4 className={styles.title}>Register</h4>
                <Form.Group hasError={!isEmailValid && !!email}>
                    <InputGroup
                        size={Size.lg}
                        className={styles.control}
                    >
                        <InputGroup.Addon>
                            <Icon iconName="fa-solid fa-at" />
                        </InputGroup.Addon>
                        <Input
                            type="email"
                            name="email"
                            id="email"
                            aria-label="email"
                            placeholder="your email"
                            autoComplete="off"
                            ref={ref}
                            onChange={debouncedOnChangeHandler}
                        />
                    </InputGroup>
                </Form.Group>
                <Button
                    block
                    variant={Variant.success}
                    size={Size.lg}
                    disabled={isSubmitting || !isValid}
                    onClick={onSubmitLogin}
                >
                    Submit
                    {isSubmitting && <Spinner />}
                </Button>
                {errors.length !== 0 && (
                    <div className="errorMessage text-center">
                        <ValidationError
                            field="email"
                            prefix="Email"
                            errors={errors}
                        />
                    </div>
                )}
                {errorMessage && <div className="errorMessage">{errorMessage}</div>}
                <div className={styles.social}>
                    <h5 className={styles.title}>
                        {
                            "Join our Discord's proof-market channel/Telegram for questions/to stay updated"
                        }
                    </h5>
                    <SocialLinks />
                </div>
                <h5 className="text-center text-muted">{'Already have an account? '}</h5>
                <Link to={Path.login}>
                    <Button
                        block
                        variant={Variant.success}
                        size={Size.lg}
                    >
                        Sign in
                    </Button>
                </Link>
            </Form>
        </AuthCard>
    );
};
