'use client';

import { User } from '@supabase/supabase-js';
import styles from './page.module.scss';
import { useAuth } from '../hooks/useAuth';
import Posts from './component/Posts';
import { Post } from '@/types';
import Loading from '@/components/Loading/loading';

interface DashboardClientProps {
  //   initialPosts: Post[];
  user: User;
}

export default function DashboardClient({
  //   initialPosts,
  user,
}: DashboardClientProps) {
  const { loading } = useAuth();

  if (loading) {
    return <Loading />;
  }

  return (
    <div className={styles.container}>
      <h1>Tableau de bord</h1>
      <p>Bienvenue {user.email}</p>
      {/* <Posts posts={initialPosts} user={user} /> */}
    </div>
  );
}
