// import React, { useEffect, useState } from 'react';
// import Link from 'next/link';
// import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';
import { signup } from './actions';

// My files
// import { registerUser } from '../../../../utils/api'; // No More here !!!!!!!!!!!!
import { RegisterValidation } from '../../utils/Validator';
import Button from '../../components/Button/Button';

// CSS
import styles from './page.module.scss';

const Register = () => {
  // const [errors, setErrors] = useState({});
  // const [values, setValues] = useState({
  //   username: '',
  //   email: '',
  //   password: '',
  // });
  // const [loading, setLoading] = useState(false);
  // const [shouldRedirect, setShouldRedirect] = useState(false);

  // const router = useRouter();

  // const handleChange = (e) => {
  //   setValues({
  //     ...values,
  //     [e.target.name]: e.target.value,
  //   });
  // };

  // useEffect(() => {
  //   if (shouldRedirect) {
  //     router.push('/dashboard');
  //   }
  // }, [shouldRedirect, router]);

  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   const validationErrors = RegisterValidation(values);
  //   setErrors(validationErrors);

  //   if (Object.keys(validationErrors).length === 0) {
  //     setLoading(true);

  //     try {
  //       const response = await registerUser(values);
  //       const data = await response.json();
  //       console.log('API response:', data);

  //       if (data.success) {
  //         toast.success('Registration successful!');
  //         setShouldRedirect(true);
  //       } else {
  //         setErrors({ server: data.error || 'Registration failed!' });
  //         toast.error(data.error || 'Registration failed!');
  //       }
  //     } catch (err) {
  //       console.error('Error during registration:', err.message);
  //       setErrors({
  //         server: err.message || 'An unknown error occurred. Please try again.',
  //       });
  //       toast.error(
  //         err.message || 'An unexpected error occurred. Please try again.'
  //       );
  //     } finally {
  //       setLoading(false);
  //     }
  //   }
  // };

  return (
    <main className={styles.container} aria-label="Register Page">
      <h1 className={styles.title}>Create an Account</h1>
      <h2 className={styles.subtitle}>Please sign up to see the dashboard.</h2>
      <form
        // onSubmit={handleSubmit}
        className={styles.form}
        aria-label="Register Form"
      >
        <label htmlFor="username" className={styles.label}></label>
        <input
          type="text"
          id="username"
          name="username"
          placeholder="Username"
          // onChange={handleChange}
          className={styles.input}
        />
        {/* {errors.username && (
          <span className={styles.error}>{errors.username}</span>
        )} */}

        <label htmlFor="email" className={styles.label}></label>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="Email"
          // onChange={handleChange}
          className={styles.input}
        />
        {/* {errors.email && <span className={styles.error}>{errors.email}</span>} */}

        <label htmlFor="password" className={styles.label}></label>
        <input
          type="password"
          id="password"
          placeholder="Password"
          className={styles.input}
          // onChange={handleChange}
          title="The password must be at least 8 characters long, contain at least one number, one lowercase letter, one uppercase letter and one special character."
          name="password"
        />
        {/* {errors.password && (
          <span className={styles.error}>{errors.password}</span>
        )} */}
        {/* <Button type="submit" text={loading ? 'Sending...' : 'Register'} /> */}
        <button formAction={signup}>Sign in</button>
      </form>
      <p className={styles.or}>- OR -</p>
      {/* <Link className={styles.link} href="/login">
        Login with an existing account
      </Link> */}
    </main>
  );
};

export default Register;
