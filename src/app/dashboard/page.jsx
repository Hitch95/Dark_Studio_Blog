"use client";

import React, { useContext, useEffect, useState } from "react";
import styles from "./page.module.scss";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Posts from "./component/Posts";
import { UserContext } from "@/context/UserContext";


const Dashboard = () => {

    const session = useSession();

    const { userData, fetchUser } = useContext(UserContext);
    console.log('User Data: ', userData);
    const router = useRouter();

    const email = session?.data?.user?.email;

    useEffect(() => {
        if (email) {
            fetchUser(email)
        }
    }, [email]);

    if (session.status === "loading") {
        return <p>Loading...</p>;
    }

    if (session.status === "unauthenticated") {
        router?.push("/dashboard/login");
    }

    if (session.status === "authenticated") {
        return (
            <div className={styles.container}>
                {
                    userData && <Posts userData={userData} />
                }
            </div>
        );
    }
};

export default Dashboard;