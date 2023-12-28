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
    });

    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleChange = (e) => {
        setValues({
            ...values,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const validationErrors = RegisterValidation(values);
        setErrors(validationErrors);

        if (Object.keys(validationErrors).length === 0) {
            setLoading(true);

            try {
                const res = await fetch("/api/auth/register", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(values),
                });

                const data = await res.json();

                if (data.success) {
                    router.push("/dashboard/login");
                } else {
                    setErrors({ server: data.error });
                }
            } catch (err) {
                console.error("Erreur lors de l'inscription:", err.message);
                setErrors({ server: "Une erreur est survenue lors de l'inscription. Veuillez réessayer." });
            }            
            setLoading(false);
        }
    };


    return (
        <main className={styles.container} aria-label="Register Page">
            <h1 className={styles.title}>Create an Account</h1>
            <h2 className={styles.subtitle}>Please sign up to see the dashboard.</h2>
            <form onSubmit={handleSubmit} className={styles.form} aria-label="Register Form">
                <label htmlFor="username" className={styles.label}></label>
                <input
                    type="text" id="username" name="username"
                    placeholder="Username"
                    onChange={handleChange}
                    className={styles.input}
                />
                {errors.username && <span className={styles.error}>{errors.username}</span>}

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
                <button type="submit" className={styles.button}>
                {loading ? "Sending..." : "Register"}
                </button>
            </form>
            <p className={styles.or}>- OR -</p>
            <Link className={styles.link} href="/dashboard/login">
                Login with an existing account
            </Link>
        </main>
    );
}

export default Register;