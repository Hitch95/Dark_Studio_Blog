'use client';

import React, { useEffect, useContext } from 'react';
import styles from './page.module.scss';
import Link from 'next/link';
// import { UserContext } from "../../../context/UserContext";
import { useRouter } from 'next/navigation';
import { ReactNode } from 'react';

const Layout = (
  {
    // children
  }
) => {
  // const { userData } = useContext(UserContext)
  const router = useRouter();

  // Use useEffect to handle side effects like navigation
  // useEffect(() => {
  //     if (userData && !userData.isAdmin) {
  //         router.push("/dashboard");
  //     }
  // }, [userData, router]);

  return (
    <div className={styles.container}>
      <div className={styles.item}>
        <div className={styles.links}>
          {/* <Link href="/dashboard/admin/users">Users</Link>
            <Link href="/dashboard/admin/posts">Posts</Link> */}
        </div>
      </div>
      <div className={styles.item}>{/* {children} */}</div>
    </div>
  );
};

export default Layout;
