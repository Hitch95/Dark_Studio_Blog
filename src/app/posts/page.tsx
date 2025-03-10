import { Suspense } from 'react';

import { getAllPosts } from '@/utils/api/postAPIs';
import Posts from './posts';
import Loading from '@/components/Loading/loading';

export const dynamic = 'force-dynamic';

const Page = async () => {
  // Don't await the data fetching function
  const postsPromise = getAllPosts();

  try {
    return (
      <Suspense fallback={<Loading />}>
        <Posts postsPromise={postsPromise} />
      </Suspense>
    );
  } catch (error) {
    console.error('Erreur while try to get posts: ', error);
    return <h4>An error happen while loading the posts.</h4>;
  }
};

export default Page;
