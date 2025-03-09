// import React, { useContext, useEffect } from 'react';
// import { useSession } from 'next-auth/react';
// import { useRouter } from 'next/navigation';
// import Posts from './component/Posts';
// import { UserContext } from '../../context/UserContext';

import styles from './page.module.scss';
import { redirect } from 'next/navigation';
import { createClient } from '../../utils/supabase/server';

const Dashboard = async () => {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  console.log('In Dashboard directory: ', user);

  if (!user) {
    redirect('/login');
  }

  return (
    <div className={styles.container}>
      <p>Hello {user.email}</p>
      {/* {userData && <Posts userData={userData} />} */}
    </div>
  );
};

export default Dashboard;
