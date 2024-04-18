"use client";

import React, { useEffect ,useContext } from "react";
import styles from "./page.module.scss";
import Link from "next/link";
import { UserContext } from "../../../context/UserContext";
import { useRouter } from "next/navigation";


const Layout = ({ children }) => {
    const { userData } = useContext(UserContext)
    const router = useRouter()

    // Use useEffect to handle side effects like navigation
    useEffect(() => {
        if (userData && !userData.isAdmin) {
            router.push("/dashboard");
        }
    }, [userData, router]);

    return (
        <div>
            {
                userData ? userData.isAdmin && (
                    <div className={styles.container}>
                        <div className={styles.item}>
                            <div className={styles.links}>
                                <Link href="/dashboard/admin/users">Users</Link>
                                <Link href="/dashboard/admin/posts">Posts</Link>
                            </div>
                        </div>
                        <div className={styles.item}>
                            {children}
                        </div>
                    </div>
                ) : ("This Router is only accessible to Admin!")
            }
        </div>
    )
}

export default Layout