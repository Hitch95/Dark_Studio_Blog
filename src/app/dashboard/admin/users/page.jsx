// 'use client';

// import React, { useContext } from 'react';
// // import { useSession } from "next-auth/react";
// import { useRouter } from 'next/navigation';
// import useSWR from 'swr';
// import { UserContext } from '../../../../context/UserContext';
// import styles from './page.module.scss';
// import toast from 'react-hot-toast';

// const Users = () => {
//   // const session = useSession();
//   const router = useRouter();
//   // const { userData } = useContext(UserContext);
//   const fetcher = (...args) => fetch(...args).then((res) => res.json());
//   const { data, mutate } = useSWR(`/api/user`, fetcher);

//   const handleClick = async (user) => {
//     user.isAdmin = user.isAdmin ? 0 : 1;
//     try {
//       const response = await fetch('/api/user', {
//         method: 'PUT',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ user }),
//       });
//       if (response.ok) {
//         await response.json();
//         mutate();
//         toast.success('Change on Admin Parameters');
//       } else {
//         console.error('Error:', response.status);
//       }
//     } catch (error) {
//       console.error('Error While Making User Admin:', error);
//     }
//   };

//   const renderContentBasedOnSession = () => {
//     switch (session.status) {
//       case 'loading':
//         return <p>Loading...</p>;
//       case 'unauthenticated':
//         router.push('/dashboard/login');
//         return null; // or <p>Redirecting...</p>
//       case 'authenticated':
//         console.log('Data:(admin/user) ', data);
//         return (
//           <div className={styles.container}>
//             <table className={styles.table}>
//               <thead>
//                 <tr>
//                   <th>Username</th>
//                   <th>Email</th>
//                   <th>isAdmin</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {data?.map((user) => (
//                   <tr key={user.id}>
//                     <td>{user.username}</td>
//                     <td>{user.email}</td>
//                     <td>
//                       <div>
//                         <div>{user.isAdmin}</div>
//                         <div>
//                           {user.id !== userData.id ? (
//                             <button onClick={() => handleClick(user)}>
//                               {user.isAdmin ? '-' : '+'}
//                             </button>
//                           ) : (
//                             <p>The OG (1st admin)</p>
//                           )}
//                         </div>
//                       </div>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         );
//       default:
//         return null; // Case when session status is unknown
//     }
//   };

//   if (userData?.isAdmin === 0) {
//     router.push('/dashboard');
//   }

//   return renderContentBasedOnSession();
// };

// export default Users;
