import { createClient } from '@/utils/supabase/client';
import { redirect } from 'next/navigation';
import DashboardClient from './dashboard';
import postRepository from '../../../repositories/postRepository';

export const dynamic = 'force-dynamic'; // Empêche le prérendu statique

export default async function DashboardPage() {
  const supabase = createClient();

  // Vérification de l'authentification
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  // if (error || !user) {
  //   redirect('/login');
  // }

  try {
    // Utilisation de la nouvelle méthode
    // const posts = await postRepository.getPostsByUserId(user.id);

    return (
      <DashboardClient
        // initialPosts={posts}
        user={user}
      />
    );
  } catch (error) {
    console.error('Erreur lors de la récupération des posts:', error);
    return <div>Une erreur est survenue lors du chargement de vos posts.</div>;
  }
}
