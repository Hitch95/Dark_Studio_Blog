"use client";

import Link from "next/link";
import React, { useContext } from "react";
import { signOut, useSession } from "next-auth/react";

import DarkModeToggle from "../DarkModeToggle/DarkModeToggle";
import { UserContext } from "../../context/UserContext";

import styles from "./navbar.module.css";


const links = [
    {
        id: 1,
        title: "Home",
        url: "/",
    },
    {
        id: 2,
        title: "Portfolio",
        url: "/portfolio",
    },
    {
        id: 3,
        title: "Posts",
        url: "/posts",
    },
    {
        id: 4,
        title: "About",
        url: "/about",
    },
    {
        id: 5,
        title: "Contact",
        url: "/contact",
    },
    {
        id: 6,
        title: "Dashboard",
        url: "/dashboard",
    },
];

const Navbar = () => {
    const session = useSession();
    const { userData } = useContext(UserContext);

    return (
        <div className={styles.container}>
            <Link href="/" className={styles.logo}>
                Dark Studio
            </Link>
            <div className={styles.links}>
                <DarkModeToggle />
                {links.map((link) => (
                    <Link key={link.id} href={link.url} className={styles.link}>
                        {link.title}
                    </Link>
                ))}
                {
                    userData && userData.isAdmin ? (
                        <Link href={"/dashboard/admin/users"} className={styles.link}>
                            Admin
                        </Link>
                    ) : ""
                }
                {session.status === "authenticated" && (
                    <button className={styles.logout} onClick={signOut}>
                        Logout
                    </button>
                )}
            </div>
        </div>
    );
};

export default Navbar;