"use client";

import React, { useContext, useState } from "react";
import styles from "./page.module.scss";
import { UserContext } from "../../context/UserContext";
import { useRouter } from "next/navigation";


const UserProfile = () => {
    const [data, setData] = useState({})
    const { userData } = useContext(UserContext);
    const router = useRouter()

    if (!userData)
        router.push("/dashboard/login")

    const handleUpdate = async () => {
        const username = document.getElementById("username").value;
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;
        const confirmpassword = document.getElementById("confirmpassword").value;

        if (!username || !email || !password || !confirmpassword) {
            alert("Please fill in all the fields");
            return;
        }

        if (password !== confirmpassword) {
            alert("Password and Confirm Password should match");
            return;
        }

        const res = await fetch(`http://localhost:3000/api/user`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ id: userData?.id, username, email, password }),
        });

        if (!res.ok) {
            throw new Error("Failed to update User");
        }
        else {
            alert("User Updated Sucessfully");
        }
    }

    return (
        <div>
            <form className={styles.user_profile_form} aria-labelledby="editUserDetail">
                <h1 id="editUserDetail">Edit User Detail</h1>
                <label htmlFor="username" className={styles.label}></label>
                <input id="username" defaultValue={userData?.username} type="text" placeholder="Username" className={styles.input} required />

                <label htmlFor="email" className={styles.label}></label>
                <input id="email" defaultValue={userData?.email} type="email" placeholder="email@example.com" className={styles.input} required />

                <label htmlFor="password" className={styles.label}></label>
                <input id="password" type="password" placeholder="New Password" className={styles.input} aria-describedby="passwordHelp" />

                <label htmlFor="confirmpassword" className={styles.label}></label>
                <input id="confirmpassword" type="password" placeholder="Confirm New Password" className={styles.input} />

                <small id="passwordHelp" className={styles.helpText}>Leave password fields empty if you don&apos;t want to change the password.</small>

                <button onClick={handleUpdate} type="submit" className={styles.button}>Update Details</button>
            </form>
        </div>
    );
};

export default UserProfile;
