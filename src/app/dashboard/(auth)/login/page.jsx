"use client";

import React, { useEffect, useState } from "react";
import styles from "./page.module.scss";
import { getProviders, signIn, useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { LoginValidation } from "../Validator";


const Login = ({ url }) => {
    const session = useSession();
    const router = useRouter();
    const params = useSearchParams();
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const [errors, setErrors] = useState({});
    const [values, setValues] = useState({
        email: "",
        password: ""
    })

    useEffect(() => {
        setError(params.get("error"));
        setSuccess(params.get("success"));
    }, [params]);

    if (session.status === "loading") {
        return <p>Loading...</p>;
    }

    if (session.status === "authenticated") {
        router?.push("/dashboard");
    }

    const handleChange = (e) => {
        setValues({
            ...values,
            [e.target.name]: e.target.value,
        });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const email = e.target[0].value;
        const password = e.target[1].value;

        const validationErrors = LoginValidation({ email, password });
        setErrors(validationErrors);

        if (Object.keys(validationErrors).length === 0) {
            signIn("credentials", {
                email,
                password,
            });
        }
    };

    return (
        <main className={styles.login_container} aria-label="Login Page">
            <h1 className={styles.title}>{success ? success : "Welcome Back"}</h1>
            <h2 className={styles.subtitle}>Please sign in to see the dashboard.</h2>
    
            <form onSubmit={handleSubmit} className={styles.form} aria-label="Login Form">
                <label htmlFor="email" className={styles.label}></label>
                <input
                    type="email" id="email" name="email"
                    placeholder="Email"
                    onChange={handleChange}
                    className={styles.input}
                />
                {errors.email && <span className={styles.error}>{errors.email}</span>}
    
                <label htmlFor="password" className={styles.label}></label>
                <input
                    type="password"
                    id="password"
                    placeholder="Password"
                    className={styles.input}
                    onChange={handleChange}
                    title="The password must be at least 8 characters long, contain at least one number, one lowercase letter, one uppercase letter and one special character."
                    name="password"
                />
                {errors.password && <span className={styles.error}>{errors.password}</span>}
                <button className={styles.button}>Login</button>
                {/*
                <button onClick={() => { signIn("google"); }} className={styles.google}>
                    Login with Google
                </button>
                */}
            </form>
    
            <div className={styles.or}>- OR -</div>
            <Link className={styles.link} href="/dashboard/register">
                Create new account
            </Link>
        </main>
    );
}
    
export default Login;