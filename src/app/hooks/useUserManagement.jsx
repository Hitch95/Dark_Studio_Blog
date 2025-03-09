// import React, { useContext, useCallback } from 'react';
// import { signOut } from "next-auth/react";
// import { UserContext } from '../../context/UserContext';

// const useUserManagement = () => {
//   const { userData, setUserData, fetchUser } = useContext(UserContext);

//   const toggleAdminStatus = useCallback(
//     async (user) => {
//       try {
//         const switchAdminRoleUser = { ...user, isAdmin: user.isAdmin ? 0 : 1 };
//         const response = await fetch(`/api/user`, {
//           method: 'PUT',
//           headers: {
//             'Content-Type': 'application/json',
//           },
//           body: JSON.stringify({ user: switchAdminRoleUser }),
//         });

//         if (response.ok) {
//           fetchUser(user.email);
//         } else {
//           throw new Error(
//             'Error while switching admin status: ',
//             response.status
//           );
//         }
//       } catch {
//         console.error('Error while switching admin status : ', error);
//       }
//     },
//     [fetchUser]
//   );

//   // const logout = useCallback((callbackUrl = "/") => {
//   //     signOut({ redirect: true, callbackUrl })
//   // }, []);

//   return {
//     userData,
//     toggleAdminStatus,
//     logout,
//   };
// };

// export default useUserManagement;
