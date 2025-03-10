'use client';

import React, { useContext, useEffect, useState } from 'react';
import styles from './page.module.scss';
import { useRouter } from 'next/navigation';
import { IoEye } from 'react-icons/io5';
import Button from '../../components/Button/Button';
import toast from 'react-hot-toast';
import { useAuth } from '../hooks/useAuth';

const UserProfile = () => {
  // const { userData } = useContext(UserContext);
  // const router = useRouter();
  const { user } = useAuth();

  // const [username, setUsername] = useState(user?.username || '');
  const [email, setEmail] = useState(user?.email || '');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // useEffect(() => {
  //     if (!userData) {
  //         router.push("/dashboard/login");
  //     }
  // }, [userData, router]);

  // const handleUpdate = async (e) => {
  //     e.preventDefault(); // Prevent the form from submitting traditionally
  //     if (!username || !email || !password || !confirmPassword) {
  //         alert("Please fill in all the fields");
  //         return;
  //     }

  //     if (password !== confirmPassword) {
  //         alert("Password and Confirm Password should match");
  //         return;
  //     }
  //     console.log(username, email, password);

  //     const userUpdatePayload = {
  //         id: userData.id,
  //         username,
  //         email,
  //         isAdmin: userData.isAdmin,
  //     };

  //     if (password) {
  //         userUpdatePayload.password = password;
  //     }

  //     console.log(userUpdatePayload);

  //     try {
  //         const res = await fetch(`http://localhost:3000/api/user`, {
  //             method: "PUT",
  //             headers: { "Content-Type": "application/json" },
  //             body: JSON.stringify({ user: userUpdatePayload }),
  //         });

  //         if (!res.ok) {
  //             throw new Error(await res.text());
  //         }
  //         toast.success("User Updated Successfully");
  //     } catch (error) {
  //         alert(`Failed to update User: ${error.message}`);
  //     }
  // }

  return (
    <form className={styles.user_profile_form} aria-labelledby='editUserDetail'>
      <p>Edit User Detail</p>

      <label htmlFor='username' className={styles.label}>
        <span>Username</span>
        <input
          id='username'
          type='text'
          placeholder='Username'
          className={styles.input}
          required
          //   value={username}
          //   onChange={(e) => setUsername(e.target.value)}
        />
      </label>

      <label htmlFor='email' className={styles.label}>
        <span>Email</span>
        <input
          id='email'
          type='email'
          placeholder='email@example.com'
          className={styles.input}
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </label>

      <label htmlFor='password' className={styles.label}>
        <span>Password</span>
        <input
          id='password'
          type='password'
          placeholder='New Password'
          className={styles.input}
          aria-describedby='passwordHelp'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <IoEye className={styles.eyeIcon} />
      </label>

      <label htmlFor='confirmpassword' className={styles.label}>
        <span>Confirm Password</span>
        <input
          id='confirmpassword'
          type='password'
          placeholder='Confirm New Password'
          className={styles.input}
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <IoEye className={styles.eyeIcon} />
      </label>

      <small id='passwordHelp' className={styles.helpText}>
        Leave password fields empty if you don&apos;t want to change the
        password.
      </small>

      <Button text={'Update Details'}></Button>
    </form>
  );
};

export default UserProfile;
