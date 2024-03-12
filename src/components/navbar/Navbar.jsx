"use client";

import React, { useRef, useContext } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { FaBars, FaTimes } from "react-icons/fa";

import DarkModeToggle from "../DarkModeToggle/DarkModeToggle";
import { ThemeContext } from "../../context/ThemeContext";
import useUserManagement from "../../app/hooks/useUserManagement";
import styles from "./navbar.module.scss";

const Navbar = () => {
    const navRef = useRef();
    const session = useSession();
    const { mode } = useContext(ThemeContext);
    const { userData, logout } = useUserManagement();

    const showNavbar = () => {
        navRef.current.classList.toggle(styles.responsiveNavbar);
    };

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
                        <button className={styles.logout} onClick={() => logout("/dashboard/login")}>
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
