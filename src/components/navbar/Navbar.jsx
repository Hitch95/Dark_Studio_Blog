"use client";

import Link from "next/link";
import React, { useRef, useContext } from "react";
import { signOut, useSession } from "next-auth/react";
import { FaBars, FaTimes } from "react-icons/fa";

import DarkModeToggle from "../DarkModeToggle/DarkModeToggle";
import { UserContext } from "../../context/UserContext";

import styles from "./navbar.module.scss";
import { ThemeContext } from "@/context/ThemeContext";

const Navbar = () => {
    const navRef = useRef();
    const session = useSession();
    const { userData } = useContext(UserContext);
    const { mode } = useContext(ThemeContext);

    const showNavbar = () => {
        navRef.current.classList.toggle(styles.responsiveNavbar);
    }

    return (
        <header className={styles.container}>
            <Link href="/" className={styles.logo}>
                Dark Studio
            </Link>

            <nav ref={navRef} className={`${mode}`}>
                <Link href={"/"} className={styles.link}>
                    Home
                </Link>
                <Link href={"/posts"} className={styles.link}>
                    Posts
                </Link>
                <Link href={"/about"} className={styles.link}>
                    About
                </Link>
                <Link href={"/contact"} className={styles.link}>
                    Contact
                </Link>
                {session.status === "authenticated" ? (
                    <>
                        <Link href={"/dashboard"} className={styles.link}>
                            Dashboard
                        </Link>
                        <Link href={"/user-profile"} className={styles.link}>
                            User Profile
                        </Link>
                        {userData && userData.isAdmin && (
                            <Link href={"/dashboard/admin/users"} className={styles.link}>
                                Admin
                            </Link>
                        )}
                        <button className={styles.logout} onClick={signOut}>
                            Logout
                        </button>
                    </>
                ) : (
                    <>
                        <Link href={"/dashboard/login"} className={styles.link}>
                            Log in
                        </Link>
                        <Link href={"/dashboard/register"} className={styles.link}>
                            Sign Up
                        </Link>
                    </>
                )}

                <button onClick={showNavbar} className={styles.navBtn + ' ' + styles.navCloseBtn}>
                    <FaTimes />
                </button>
            </nav>

            <DarkModeToggle />

            <button onClick={showNavbar} className={styles.navBtn}>
                <FaBars />
            </button>
        </header>
    );
};

export default Navbar;
