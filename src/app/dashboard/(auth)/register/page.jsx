"use client";

import React, { useState } from "react";
import styles from "./page.module.scss";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { RegisterValidation } from "../Validator";


const Register = () => {
    const [errors, setErrors] = useState({});
    const [values, setValues] = useState({
        username: "",
        email: "",
        password: ""
    })
    const router = useRouter();

    const handleChange = (e) => {
        setValues({ ...values,
        [e.target.name]: e.target.value,
        });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const username = e.target[0].value;
        const email = e.target[1].value;
        const password = e.target[2].value;

        const validationErrors = RegisterValidation({ username, email, password });
        setErrors(validationErrors);

        if (Object.keys(validationErrors).length === 0) {
            try {
                const res = await fetch("/api/auth/register", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        username,
                        email,
                        password,
                    }),
                });
                res.status === 201 && router.push("/dashboard/login?success=Account has been created");
            } catch (err) {
                setErrors(err);
                console.log(err);
            }
        }
    };


    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Create an Account</h1>
            <h2 className={styles.subtitle}>Please sign up to see the dashboard.</h2>
            <form onSubmit={handleSubmit} className={styles.form}>
                <input
                    type="text" name="username"
                    placeholder="Username"
                    onChange={handleChange}
                    required
                    className={styles.input}
                />
                {errors.username && <span className={styles.error}>{errors.username}</span>}

                <input
                    type="text" name="email"
                    placeholder="Email"
                    onChange={handleChange}
                    required
                    className={styles.input}
                />
                {errors.email && <span className={styles.error}>{errors.email}</span>}

                <input
                    type="password"
                    placeholder="Password"
                    className={styles.input}
                    onChange={handleChange}
                    title="The password must be at least 8 characters long, contain at least one number, one lowercase letter, one uppercase letter and one special character."
                    name="password"
                    required
                />
                {errors.password && <span className={styles.error}>{errors.password}</span>}
                <button className={styles.button}>Register</button>
            </form>
            <span className={styles.or}>- OR -</span>
            <Link className={styles.link} href="/dashboard/login">
                Login with an existing account
            </Link>
        </div>
    );
};

export default Register;