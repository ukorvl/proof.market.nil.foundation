/**
 * @file React component.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

import { ReactElement, useRef, useState, useMemo, useEffect, ChangeEvent } from 'react';
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
import { useForm, ValidationError } from '@formspree/react/dist/index.js';
import { Link } from 'react-router-dom';
import debounce from 'lodash/debounce';
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
    const [emailValue, setEmailValue] = useState('');
    const isEmailValid = useMemo(() => !!emailValue && emailRegExp.test(emailValue), [emailValue]);
    const emailInputRef = useRef<HTMLInputElement | null>(null);
    const [state, handleSubmit] = useForm(process.env.REACT_APP_FORMSPREE_FORM_ID!, {
        data: {
            subject: `New credentials request from ${window.location.hostname}`,
        },
    });
    const { submitting, succeeded, errors } = state;
    const debouncedOnChangeHandler = useRef(
        debounce((e: ChangeEvent<HTMLInputElement>) => {
            setEmailValue(e.target.value);
        }, 180),
    ).current;

    useEffect(() => {
        emailInputRef.current && emailInputRef.current.focus();
    }, []);

    if (succeeded) {
        return (
            <div className={styles.successMessage}>
                <h5>Thank you for request!</h5>
                <Link to={Path.root}>
                    <Button
                        block
                        variant={Variant.primary}
                        size={Size.lg}
                    >
                        Back to main
                    </Button>
                </Link>
            </div>
        );
    }

    return (
        <AuthCard>
            <Form
                className={styles.form}
                onSubmit={handleSubmit}
            >
                <h4 className={styles.title}>Request your beta-test credentials via email</h4>
                <div className={`${styles.description} text-muted`}>
                    If you would like to get involved early, leave email below and we will let you
                    know when proof market opens!
                </div>
                <Form.Group hasError={!isEmailValid && !!emailValue}>
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
                            ref={emailInputRef}
                            onChange={debouncedOnChangeHandler}
                        />
                    </InputGroup>
                </Form.Group>
                <Button
                    block
                    variant={Variant.success}
                    size={Size.lg}
                    disabled={submitting || !isEmailValid}
                    type="submit"
                >
                    Submit
                    {submitting && <Spinner />}
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
                        variant={Variant.primary}
                        size={Size.lg}
                    >
                        Sign in
                    </Button>
                </Link>
            </Form>
        </AuthCard>
    );
};
