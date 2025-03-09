import { Suspense } from 'react';

import { getAllPosts } from '@/utils/api/postAPIs';
import Posts from './posts';
import Loading from '@/components/Loading/loading';

export default function Page() {
  // Don't await the data fetching function
  const postsPromise = getAllPosts();

  return (
    <Suspense fallback={<Loading />}>
      <Posts postsPromise={postsPromise} />
    </Suspense>
  );
}
