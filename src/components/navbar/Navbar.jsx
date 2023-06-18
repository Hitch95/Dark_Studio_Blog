"use client";

import Link from "next/link";
import React, { useState, useContext } from "react";
import { signOut, useSession } from "next-auth/react";

import DarkModeToggle from "../DarkModeToggle/DarkModeToggle";
import { UserContext } from "../../context/UserContext";

import styles from "./navbar.module.scss";


const links = [
    {
        id: 1,
        title: "Home",
        url: "/",
    },
    {
        id: 2,
        title: "Posts",
        url: "/posts",
    },
    {
        id: 3,
        title: "About",
        url: "/about",
    },
    {
        id: 4,
        title: "Contact",
        url: "/contact",
    },
    {
        id: 5,
        title: "Dashboard",
        url: "/dashboard",
    }
];

const Navbar = () => {
    const session = useSession();
    const { userData } = useContext(UserContext);
    const [hamburgerMenu, setHamburgerMenu] = useState(false);

    const handleHamburgerMenu = () => {
        setHamburgerMenu(!hamburgerMenu);
    };

    return (
        <div className={styles.container}>
            <Link href="/" className={styles.logo}>
                Dark Studio
            </Link>

            <div className={styles.mobileMenuButton} onClick={handleHamburgerMenu}>
                <span className={styles.hamburgerIcon}></span>
            </div>

            <DarkModeToggle />

            <div className={`${styles.links} ${hamburgerMenu ? styles.open : ""}`}>

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
                    <div>
                        <Link href={"/user-profile"} className={styles.link}>
                            User Profile
                        </Link>
                        <button className={styles.logout} onClick={signOut}>
                            Logout
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Navbar;