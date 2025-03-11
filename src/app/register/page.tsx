'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { toast } from 'react-hot-toast';
import { signup } from './actions';

// My files
import { RegisterValidation } from '../../utils/Validator';
import Button from '../../components/Button/Button';

// CSS
import styles from './page.module.scss';
import { useRouter } from 'next/navigation';

const Register = () => {
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  // const [shouldRedirect, setShouldRedirect] = useState(false);

  const router = useRouter();

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  // useEffect(() => {
  //   if (shouldRedirect) {
  //     router.push('/dashboard');
  //   }
  // }, [shouldRedirect, router]);

  const handleSubmit = async (formData) => {
    setLoading(true);

    try {
      const validationErrors = RegisterValidation(formData);

      if (Object.keys(validationErrors).length > 0) {
        const firstError = Object.values(validationErrors)[0];
        // setErrors(validationErrors);
        console.error('Validation errors:', validationErrors);
        toast.error(firstError);
        return;
      }

      const form = new FormData();
      form.append('username', formData.username);
      form.append('email', formData.email);
      form.append('password', formData.password);
      console.log('Form data: ', form);

      const result = await signup(form);
      console.log('API result:', result);

      if (result?.error) {
        toast.error(result.error);
      } else {
        toast.success(result.message);
        setTimeout(() => {
          router.push('/');
        }, 2000);
      }
    } catch (error: any) {
      console.error('Unexpected error:', error);
      toast.error('An unexpected error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className={styles.container} aria-label='Register Page'>
      <h1 className={styles.title}>Create an Account</h1>
      <h2 className={styles.subtitle}>Please sign up to see the dashboard.</h2>
      <form
        className={styles.form}
        aria-label='Register Form'
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit(formData);
        }}
      >
        <label htmlFor='username' className={styles.label}></label>
        <input
          type='text'
          id='username'
          name='username'
          placeholder='Username'
          onChange={handleChange}
          className={styles.input}
          value={formData.username}
        />
        {/* {errors.username && (
          <span className={styles.error}>{errors.username}</span>
        )} */}

        <label htmlFor='email' className={styles.label}></label>
        <input
          type='email'
          id='email'
          name='email'
          placeholder='Email'
          onChange={handleChange}
          className={styles.input}
          value={formData.email}
          required
        />
        {/* {errors.email && <span className={styles.error}>{errors.email}</span>} */}

        <label htmlFor='password' className={styles.label}></label>
        <input
          type='password'
          id='password'
          placeholder='Password'
          className={styles.input}
          onChange={handleChange}
          title='The password must be at least 8 characters long, contain at least one number, one lowercase letter, one uppercase letter and one special character.'
          name='password'
          value={formData.password}
          required
        />
        {/* {errors.password && (
          <span className={styles.error}>{errors.password}</span>
        )} */}
        {/* <Button type="submit" text={loading ? 'Sending...' : 'Register'} /> */}
        <button type={'submit'} onClick={() => {}}>
          Sign in
        </button>
      </form>
      <p className={styles.or}>- OR -</p>
      <Link className={styles.link} href='/login'>
        Login with an existing account
      </Link>
    </main>
  );
};

export default Register;
