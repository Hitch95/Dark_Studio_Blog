'use client';

import React, { useRef } from 'react';
import Link from 'next/link';
import { FaBars, FaTimes } from 'react-icons/fa';
import { AiFillHome } from 'react-icons/ai';

import useAuth from '@/app/hooks/useAuth';
import useTheme from '@/app/hooks/useTheme';
import styles from './navbar.module.scss';

const Navbar = () => {
  const navRef = useRef<HTMLDivElement>(null);
  const { mode, toggle } = useTheme();
  const { user, logout } = useAuth();

  console.log('user : ', user);

  const showNavbar = () => {
    if (navRef.current) {
      navRef.current.classList.toggle(styles.responsiveNavbar);
    }
  };

  return (
    <header className={styles.container}>
      <Link href='/' className={styles.logo}>
        Dark Studio
      </Link>

      <nav ref={navRef} className={`${mode}`}>
        <Link href={'/'} className={styles.link}>
          <AiFillHome />
        </Link>
        <Link href={'/posts'} className={styles.link}>
          Posts
        </Link>
        <Link href={'/about'} className={styles.link}>
          About
        </Link>
        <Link href={'/contact'} className={styles.link}>
          Contact
        </Link>
        {user ? (
          <>
            <Link href={'/dashboard'} className={styles.link}>
              Dashboard
            </Link>
            <Link href={'/user-profile'} className={styles.link}>
              User Profile
            </Link>
            {/* {userData && userData.isAdmin && (
              <Link href={'/dashboard/admin/users'} className={styles.link}>
                Admin
              </Link>
            )} */}
            <button className={styles.logout} onClick={logout}>
              Logout
            </button>
          </>
        ) : (
          <>
            <Link href={'/login'} className={styles.link}>
              Log in
            </Link>
            <Link href={'/register'} className={styles.link}>
              Sign Up
            </Link>
          </>
        )}

        <button
          onClick={showNavbar}
          className={styles.navBtn + ' ' + styles.navCloseBtn}
        >
          <FaTimes />
        </button>
      </nav>

      <div className={styles.dark_mode_toggle_container} onClick={toggle}>
        <div>🌙</div>
        <div>🔆</div>
        <div style={mode === 'light' ? { left: '2px' } : { right: '2px' }} />
      </div>

      <button onClick={showNavbar} className={styles.navBtn}>
        <FaBars />
      </button>
    </header>
  );
};

export default Navbar;
