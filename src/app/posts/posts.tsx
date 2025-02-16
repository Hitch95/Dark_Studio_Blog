'use client';

import { use, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from './page.module.scss';

const Posts = ({ posts }: {
  posts: Promise<{ id: string, title: string, description: string, image: string }>
}) => {
  const allPosts = use(posts);
  const [error, setError] = useState('');

  if (error) {
    return <p>{error}</p>;
  }
  if (!allPosts || allPosts.length === 0) {
    return <p>No post available</p>;
  }

  return (
    <main className={styles.posts_container}>
      {allPosts.map((post) => (
        <Link
          href={`/posts/${post.id}`}
          className={styles.single_post_container}
          key={post.id}
        >
          <figure className={styles.imageContainer}>
            <Image
              src={post.image}
              priority
              alt={post.title}
              width={400}
              height={250}
              className={styles.image}
            />
          </figure>
          <div className={styles.content}>
            <h3 className={styles.title}>{post.title}</h3>
            <p className={styles.desc}>{post.description}</p>
          </div>
        </Link>
      ))}
    </main>
  );
};

export default Posts;