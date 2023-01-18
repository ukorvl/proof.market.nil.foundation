/**
 * @file React component.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

import { ReactElement, useRef, useState, useEffect, useMemo } from 'react';
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
import { Link, useNavigate } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';
import { useForm } from 'react-hook-form';
import { Path } from 'src/routing';
import { SocialLinks } from 'src/components';
import { RegisterData } from 'src/models';
import { signUp } from 'src/api';
import { AuthCard } from '../AuthCard';
import styles from './RegisterForm.module.scss';

const usernameRequiredMinLength = 3;

/**
 * Register form.
 *
 * @returns React component.
 */
export const RegisterForm = (): ReactElement => {
    const [errorMessage, setErrorMessage] = useState<string>();
    const inputAnimationRef = useRef(null);
    const buttonAnimationRef = useRef(null);
    const userNameInputRef = useRef<HTMLInputElement | null>(null);
    const navigate = useNavigate();
    const {
        handleSubmit,
        register,
        formState: { isSubmitting, errors, isValid, dirtyFields },
    } = useForm<RegisterData>({ mode: 'onChange' });

    const onSubmitLogin = handleSubmit(async (data: RegisterData): Promise<void> => {
        setErrorMessage('');
        try {
            await signUp(data);

            notificationActions?.create({
                title: 'Registration success',
                message: `Successfully register new user ${data.user}`,
                variant: Variant.success,
            });

            navigate(Path.login);
        } catch (e) {
            setErrorMessage('Register error');
        }
    });

    useEffect(() => {
        userNameInputRef.current && userNameInputRef.current.focus();
    }, []);

    const { ref, ...restRegister } = register('user', {
        required: true,
        minLength: usernameRequiredMinLength,
    });
    const showPasswdInput = useMemo(() => !!dirtyFields.user, [dirtyFields.user]);
    const showSubmitButton = useMemo(() => !!dirtyFields.passwd, [dirtyFields.passwd]);

    console.log(dirtyFields, showSubmitButton);

    return (
        <AuthCard>
            <Form className={styles.form}>
                <h4 className={styles.title}>Welcome to Proof Market!</h4>
                <div className="text-center text-muted">Please, enter your username</div>
                <Form.Group hasError={!!errors['user']}>
                    <InputGroup
                        size={Size.lg}
                        className={styles.control}
                    >
                        <InputGroup.Addon>
                            <Icon
                                iconName="fa-solid fa-user"
                                className={styles.icon}
                            />
                        </InputGroup.Addon>
                        <Input
                            type="text"
                            id="userName"
                            placeholder="username"
                            aria-label="username"
                            ref={e => {
                                ref(e);
                                userNameInputRef.current = e;
                            }}
                            {...restRegister}
                        />
                    </InputGroup>
                </Form.Group>
                <CSSTransition
                    classNames="fade"
                    timeout={300}
                    in={showPasswdInput}
                    unmountOnExit
                    nodeRef={inputAnimationRef}
                >
                    <div ref={inputAnimationRef}>
                        <Form.Group hasError={!!errors['passwd']}>
                            <div className="text-center text-muted">And create a password</div>
                            <InputGroup
                                size={Size.lg}
                                className={styles.control}
                            >
                                <InputGroup.Addon>
                                    <Icon
                                        iconName="fa-solid fa-lock"
                                        className={styles.icon}
                                    />
                                </InputGroup.Addon>
                                <Input
                                    type="text"
                                    id="password"
                                    placeholder="password"
                                    aria-label="password"
                                    autoComplete="off"
                                    {...register('passwd', { required: true })}
                                />
                            </InputGroup>
                        </Form.Group>
                    </div>
                </CSSTransition>
                <CSSTransition
                    classNames="fade"
                    timeout={300}
                    in={showSubmitButton}
                    unmountOnExit
                    nodeRef={buttonAnimationRef}
                >
                    <div ref={buttonAnimationRef}>
                        <Button
                            block
                            variant={Variant.success}
                            size={Size.lg}
                            disabled={isSubmitting || !isValid}
                            onClick={onSubmitLogin}
                        >
                            Register
                            {isSubmitting && <Spinner />}
                        </Button>
                    </div>
                </CSSTransition>
                {errorMessage && <div className="errorMessage">{errorMessage}</div>}
                <div className={styles.bottomBlock}>
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
                </div>
            </Form>
        </AuthCard>
    );
};
