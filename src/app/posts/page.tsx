import { getAllPosts } from '../../utils/api'
import Posts from './posts';
import { Suspense } from 'react';

export default function Page() {
  // Don't await the data fetching function
  const posts = getAllPosts();

  return (
    <Suspense fallback={<>Loading...</>}>
      <Posts posts={posts} />
    </Suspense>
  )
}