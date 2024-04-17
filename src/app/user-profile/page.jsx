"use client";

import React, { useContext, useEffect, useState } from "react";
import styles from "./page.module.scss";
import { UserContext } from "../../context/UserContext";
import { useRouter } from "next/navigation";
import { IoEye } from "react-icons/io5";


const UserProfile = () => {
    const { userData } = useContext(UserContext);
    const router = useRouter();

    const [username, setUsername] = useState(userData?.username || '');
    const [email, setEmail] = useState(userData?.email || '');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    useEffect(() => {
        if (!userData) {
            router.push("/dashboard/login");
        }
    }, [userData, router]);

    const handleUpdate = async (e) => {
        e.preventDefault(); // Prevent the form from submitting traditionally
        if (!username || !email || !password || !confirmPassword) {
            alert("Please fill in all the fields");
            return;
        }

        if (password !== confirmPassword) {
            alert("Password and Confirm Password should match");
            return;
        }
        console.log(username, email, password);

        const userUpdatePayload = {
            id: userData.id,
            username,
            email,
            isAdmin: userData.isAdmin,
        };

        if (password) {
            userUpdatePayload.password = password;
        }
        
        console.log(userUpdatePayload);

        try {
            const res = await fetch(`http://localhost:3000/api/user`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ user: userUpdatePayload }),
            });

            if (!res.ok) {
                throw new Error(await res.text());
            }
            alert("User Updated Successfully");
        } catch (error) {
            alert(`Failed to update User: ${error.message}`);
        }
    }

    return (
            <form className={styles.user_profile_form} aria-labelledby="editUserDetail" onSubmit={handleUpdate}>
                <p>Edit User Detail</p>

                <label htmlFor="username" className={styles.label}>Username</label>
                <input
                    id="username"
                    type="text"
                    placeholder="Username"
                    className={styles.input}
                    required
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                />

                <label htmlFor="email" className={styles.label}>Email</label>
                <input
                    id="email"
                    type="email"
                    placeholder="email@example.com"
                    className={styles.input}
                    required
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                />

                <label htmlFor="password" className={styles.label}>New Password</label>
                <input
                    id="password"
                    type="password"
                    placeholder="New Password"
                    className={styles.input}
                    aria-describedby="passwordHelp"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                />
                <IoEye className={styles.eyeIcon} />

                <label htmlFor="confirmpassword" className={styles.label}>Confirm New Password</label>
                <input
                    id="confirmpassword"
                    type="password"
                    placeholder="Confirm New Password"
                    className={styles.input}
                    value={confirmPassword}
                    onChange={e => setConfirmPassword(e.target.value)}
                />
                

                <small id="passwordHelp" className={styles.helpText}>
                    Leave password fields empty if you don&apos;t want to change the password.
                </small>

                <button type="submit" className={styles.button}>
                    Update Details
                </button>
            </form>
    );
};

export default UserProfile;