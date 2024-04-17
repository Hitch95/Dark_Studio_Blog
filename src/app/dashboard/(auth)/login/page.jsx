"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { signIn, useSession } from "next-auth/react";
import Link from "next/link";
import { toast } from "react-hot-toast";
import { LoginValidation } from "../Validator";
import Button from "../../../../components/Button/Button";
import styles from "./page.module.scss";

const Login = () => {
    const { data: status } = useSession();
    const router = useRouter();
    const [errors, setErrors] = useState({});
    const [values, setValues] = useState({
        email: "",
        password: ""
    });
    const [shouldRedirect, setShouldRedirect] = useState(false);

    useEffect(() => {
        if (status === "authenticated" || shouldRedirect) {
            router.push("/dashboard");
        }
    }, [status, router, shouldRedirect]);

    const handleChange = (e) => {
        setValues({
            ...values,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        const validationErrors = LoginValidation(values);
        setErrors(validationErrors);

        if (Object.keys(validationErrors).length === 0) {
            toast.success("Welcome");
            try {
                const result = signIn("credentials", {
                    redirect: false,
                    ...values
                });
                if (!result.error) {
                    setShouldRedirect(true);
                } else {
                    setErrors({ form: result.error });
                }
            }
           catch (error) {
            console.error("Error during login:", error);
            setErrors({ form: error.message });
           }
        }
    };

    if (status === "loading") {
        return <p>Loading...</p>;
    }

    return (
        <main className={styles.login_container}>
            <h1>Welcome Back</h1>
            <form onSubmit={handleSubmit} className={styles.form}>
                <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Email"
                    onChange={handleChange}
                    className={styles.input}
                    value={values.email}
                />
                {errors.email && <span className={styles.error}>{errors.email}</span>}

                <input
                    type="password"
                    id="password"
                    name="password"
                    placeholder="Password"
                    className={styles.input}
                    onChange={handleChange}
                    title="The password must be at least 8 characters long, contain at least one number, one lowercase letter, one uppercase letter and one special character."
                    value={values.password}
                />
                {errors.password && <span className={styles.error}>{errors.password}</span>}
                
                <Button type="submit" text={"Login"}></Button>
            </form>

            <p className={styles.or}>- OR -</p>
            <Link href="/dashboard/register">
                Create new account
            </Link>
        </main>
    );
}

export default Login;
