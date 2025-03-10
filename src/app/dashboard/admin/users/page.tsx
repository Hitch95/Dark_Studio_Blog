'use client';

import { useRouter } from 'next/navigation';
import useSWR from 'swr';
import styles from './page.module.scss';
import toast from 'react-hot-toast';
import { useAuth } from '@/app/hooks/useAuth';
import Loading from '@/components/Loading/loading';

const Users = () => {
  const { user, loading } = useAuth();

  // const router = useRouter();
  // const fetcher = (...args) => fetch(...args).then((res) => res.json());
  // const { data, mutate } = useSWR(`/api/user`, fetcher);

  // const handleClick = async (user) => {
  //   user.isAdmin = user.isAdmin ? 0 : 1;
  //   try {
  //     const response = await fetch('/api/user', {
  //       method: 'PUT',
  //       headers: { 'Content-Type': 'application/json' },
  //       body: JSON.stringify({ user }),
  //     });
  //     if (response.ok) {
  //       await response.json();
  //       mutate();
  //       toast.success('Change on Admin Parameters');
  //     } else {
  //       console.error('Error:', response.status);
  //     }
  //   } catch (error) {
  //     console.error('Error While Making User Admin:', error);
  //   }
  // };

  const renderContentBasedOnSession = () => {
    // switch (user) {
    //   case 'loading':
    //     return <Loading />;
    //   case !user:
    //     router.push('/login');
    //     return null; // or <p>Redirecting...</p>
    //   case user:
    //     console.log('Data:(admin/user) ', data);
    return (
      <div className={styles.container}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Username</th>
              <th>Email</th>
              <th>isAdmin</th>
            </tr>
          </thead>
          <tbody>
            {/* {data?.map((user) => (
                  <tr key={user.id}>
                    <td>{user.username}</td>
                    <td>{user.email}</td>
                    <td>
                      <div>
                        <div>{user.isAdmin}</div>
                        <div>
                          {user.id !== userData.id ? (
                            <button onClick={() => handleClick(user)}>
                              {user.isAdmin ? '-' : '+'}
                            </button>
                          ) : (
                            <p>The OG (1st admin)</p>
                          )}
                        </div>
                      </div>
                    </td>
                  </tr>
                ))} */}
          </tbody>
        </table>
      </div>
    );
  };

  // if (user?.isAdmin === 0) {
  //   router.push('/dashboard');
  // }

  return renderContentBasedOnSession();
};

export default Users;
