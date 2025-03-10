// import React, { useState } from 'react';
// import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { toast } from 'react-hot-toast';
import { login } from './actions';

// My Files
import Button from '../../components/Button/Button';

// CSS
import styles from './page.module.scss';

const Login = () => {
  // const router = useRouter();
  // const [email, setEmail] = useState('');
  // const [password, setPassword] = useState('');
  // const [error, setError] = useState('');
  // const [isLoading, setIsLoading] = useState(false);

  // const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const { name, value } = e.target;
  //   if (name === 'email') {
  //     setEmail(value);
  //   } else if (name === 'password') {
  //     setPassword(value);
  //   }
  // };

  return (
    <main className={styles.login_container}>
      <h1>Welcome</h1>
      {/* {error && <div className={styles.error}>{error}</div>} */}
      <form className={styles.form}>
        <input
          type='email'
          id='email'
          name='email'
          placeholder='Email'
          // onChange={handleInputChange}
          className={styles.input}
          // value={email}
          required
        />

        <input
          type='password'
          id='password'
          name='password'
          placeholder='Password'
          className={styles.input}
          // onChange={handleInputChange}
          // value={password}
          required
        />

        <button formAction={login}>Log in</button>
        {/* <button formAction={signup}>Sign up</button> */}
      </form>

      <p className={styles.or}>- OR -</p>
      <Link href='/register' className={styles.link}>
        Create new account
      </Link>
    </main>
  );
};

export default Login;
