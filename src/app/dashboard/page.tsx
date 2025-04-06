import { Suspense } from 'react';
import { redirect } from 'next/navigation';

import { auth } from '@/auth';
import { User } from '@/types';
import Loading from '@/components/Loading/loading';
import DashboardClient from './dashboard';
import { fetchPostsOfOneUser } from '@/utils/api/userAPIs';

export const dynamic = 'force-dynamic'; // Prevents static pre-rendering

const DashboardPage = async () => {
  const session = await auth(); // Verify server-side authentication
  const user = session?.user; // Get user from the session

  console.log('user : ', user);

  if (!user || !user.id) {
    console.error('User not authenticated or ID missing, redirect to login.');
    redirect('/login');
  }

  try {
    const userPosts = await fetchPostsOfOneUser(user.id);

    const dashboardUser: User = {
      id: user.id, // user.id is guaranteed to exist here
      firstName: user.firstName ?? '',
      lastName: user.lastName ?? '',
      username: user.username ?? '',
      email: user.email ?? '',
      emailVerified: !!user.emailVerified,
      image: user.image ?? '',
      isAdmin: !!user.isAdmin,
    };

    return (
      <Suspense fallback={<Loading />}>
        <DashboardClient userPosts={userPosts} user={dashboardUser} />
      </Suspense>
    );
  } catch (error) {
    console.error('Error retrieving posts:', error);
    return <>An error occurred while loading your posts.</>;
  }
};

export default DashboardPage;
