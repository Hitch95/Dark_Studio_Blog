"use client"

import React, { useContext } from "react";
import styles from "./page.module.css";
import { useSession } from "next-auth/react";
import useSWR from "swr";
import { UserContext } from "@/context/UserContext";


const Users = () => {
    const session = useSession()

    const { userData } = useContext(UserContext)


    const fetcher = (...args) => fetch(...args).then((res) => res.json());

    const { data, mutate, error, isLoading } = useSWR(
        `/api/user`,
        fetcher
    );

    console.log('All Users: ', data);


    const handleClick = async (user) => {

        // if it is already admin, make it not admin
        // if it is not admin, make it admin
        user.isAdmin = user.isAdmin ? 0 : 1

        try {
            const response = await fetch("/api/user", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ user }),
            });

            if (response.ok) {
                const data = await response.json();
                console.log("After update: ", data);
                mutate();
            } else {
                console.log("Error:", response.status);
            }
        } catch (error) {
            console.log("Error While Making User Admin:", error);
        }

    }

    if (session.status === "loading") {
        return <p>Loading...</p>;
    }

    if (session.status === "unauthenticated") {
        router?.push("/dashboard/login");
    }

    if (userData?.isAdmin === 0) {
        router?.push("/dashboard");
    }

    if (session.status === "authenticated") {
        console.log("Data:(admin/user) ", data);
        return (
            <div className={styles.container}>
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th>USERNAME</th>
                            <th>Email</th>
                            <th>isAdmin</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            data?.map((user) => (

                                <tr key={user.id}>
                                    <td>{user.username}</td>
                                    <td>{user.email}</td>
                                    <td>
                                        <div style={{ display: "flex", justifyContent: "space-between" }}>
                                            <div style={{ flex: 1 }}>{user.isAdmin}</div>
                                            <div style={{ flex: 1, textAlign: "center" }}>
                                                {
                                                    user.id !== userData.id ? (
                                                        <button style={{ padding: "2px 10px" }} onClick={() => handleClick(user)}>
                                                            {user.isAdmin ? "-" : "+"}
                                                        </button>
                                                    ) : (
                                                        <p>The OG (1st admin)</p>
                                                    )
                                                }
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        );
    }
}

export default Users