import { Suspense } from 'react';

import { getOnePost } from '@/utils/api/postAPIs';
import SinglePost from './post';

const PostPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const post = await getOnePost(id);

  return (
    <Suspense fallback={<>Loading...</>}>
      <SinglePost post={post} />
    </Suspense>
  );
};

export default PostPage;
