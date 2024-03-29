"use client"

import React, { useContext } from "react";
import { useSession } from 'next-auth/react';
import useSWR from "swr";
import useUserManagement from "../../../hooks/useUserManagement";
import { UserContext } from "../../../../context/UserContext";
import styles from "./page.module.scss";

const Users = () => {
    const session = useSession();
    const { toggleAdminStatus } = useUserManagement();
    const { userData } = useContext(UserContext);
    
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
            const response = await toggleAdminStatus(user);

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
                            <th>Username</th>
                            <th>Email</th>
                            <th>Admin</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            data?.map((user) => (

                                <tr key={user.id}>
                                    <td>{user.username}</td>
                                    <td>{user.email}</td>
                                    <td>
                                        <div>
                                            <div>{user.isAdmin}</div>
                                            <div>
                                                {
                                                    user.id !== userData.id ? (
                                                        <button onClick={() => handleClick(user)}>
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

export default Users;