"use client";

import React, { useContext, useEffect } from "react";
import styles from "./page.module.scss";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Posts from "./component/Posts";
import { UserContext } from "../../context/UserContext";


const Dashboard = () => {
    const session = useSession();
    const { userData, fetchUser } = useContext(UserContext);
    const router = useRouter();
    const email = session?.data?.user?.email;

    useEffect(() => {
        const fetchData = async () => {
          if (email) {
            await fetchUser(email);
          }
        };
      
        fetchData();
      }, [email, fetchUser]);      
    

    switch (session.status) {
        case "loading":
            return <p>Loading...</p>;
        case "unauthenticated":
            router?.push("/dashboard/login");
            break;
        case "authenticated":
            return (
                <div className={styles.container}>
                    {userData && <Posts userData={userData} />}
                </div>
            );
        default:
            break;
    }
};

export default Dashboard;
