"use client";

import React, { useContext } from "react";
import styles from "./page.module.css";
import Link from "next/link";
import { UserContext } from "@/context/UserContext";
import { useRouter } from "next/navigation";


const Layout = ({ children }) => {
    const { userData } = useContext(UserContext)
    const router = useRouter()

    if (userData) {
        if (!userData.isAdmin)
            router?.push("/dashboard")
    }

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