"use client";
import cn from "classnames";
import styles from "./LoginForm.module.css";
import Link from "next/link";
import AuthService from "../../services/AuthService";
import { useInput } from "../../hooks/useInput";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { MouseEvent, useEffect, useState } from "react";
import { getGoogleAuthUrl } from "../../utils/getGoogleAuthUrl";
import { getFacebookAuthUrl } from "../../utils/getFacebookAuthUrl";

export default function LoginForm(): JSX.Element {
    const router = useRouter();
    const dispatch = useAppDispatch();
    const { isProcessing, error } = useAppSelector(state => state.userAuthReducer); 
    const [isValidForm, setIsValidForm] = useState(false);
    const email = useInput("", { isEmpty: false, isEmail: true });
    const password = useInput("", {
        isEmpty: false,
        minLength: 5,
        maxLength: 20,
    });

    useEffect(() => {
        if (
            !email.emailError &&
            !password.minLengthError &&
            !password.maxLengthError
        ) {
            setIsValidForm(true);
        } else {
            setIsValidForm(false);
        }
    }, [email, password]);

    const onLogin = async (event: MouseEvent): Promise<void> => {
        try {
            event.preventDefault();
            await dispatch(AuthService.login({
                email: email.value, 
                password: password.value
            }));
            router.push("/login");
        } catch (error) {
            console.log(error);
        }
    };
    
    return (
        <form className={cn(styles.form)}>
            <h1 className={cn(styles.formTitle)}>Login</h1>
            <h6 className={cn(styles.loginError)}>
                { error && error }
                { isProcessing && "...Processing" }
            </h6>
            <div className={styles.formGroup}>
                <input
                    className={cn(styles.formInput)}
                    type="email"
                    value={email.value}
                    placeholder=""
                    onBlur={(e) => email.onBlur(e)}
                    onChange={(e) => email.onChange(e)}
                />
                <label className={cn(styles.formLabel)}>Email</label>
                <div className={cn(styles.errorMessages)}>
                    {email.isDirty && email.isEmptyError && (
                        <div className={cn(styles.error)}>
                            {email.isEmptyError}
                        </div>
                    )}
                    {email.isDirty && email.emailError && (
                        <div className={cn(styles.error)}>
                            {email.emailError}
                        </div>
                    )}
                </div>
            </div>
            <div className={styles.formGroup}>
                <input
                    className={cn(styles.formInput)}
                    type="password"
                    value={password.value}
                    placeholder=" "
                    onBlur={(e) => password.onBlur(e)}
                    onChange={(e) => password.onChange(e)}
                />
                <label className={cn(styles.formLabel)}>Password</label>
                <div className={cn(styles.errorMessages)}>
                    {password.isDirty && password.minLengthError && (
                        <div className={cn(styles.error)}>
                            {password.minLengthError}
                        </div>
                    )}
                    {password.isDirty && password.maxLengthError && (
                        <div className={cn(styles.error)}>
                            {password.maxLengthError}
                        </div>
                    )}
                    {password.isDirty && password.isEmptyError && (
                        <div className={cn(styles.error)}>
                            {password.isEmptyError}
                        </div>
                    )}
                </div>
            </div>
            <button
                className={cn(styles.formButton)}
                onClick={(e) => onLogin(e)}
                disabled={!isValidForm}
            >Login</button>
            <ul className={cn(styles.socials)}>
                <li className={cn(styles.google, styles.social)}>
                    <Link href={getGoogleAuthUrl()}>Google</Link>
                </li>
                <li className={cn(styles.facebook, styles.social)}>
                    <Link href={getFacebookAuthUrl()}>Facebook</Link>
                </li>
            </ul>
            <h5 className={cn(styles.singUpLink)}>
                {"Don't have an account? "}
                <Link className={cn(styles.singUpLink)} href="/auth/regist">
                    Sign Up
                </Link>
            </h5>
        </form>
    );
}
