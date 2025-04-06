'use client';

import { useRef, useState } from 'react';
import Image from 'next/image';
import toast from 'react-hot-toast';
import useSWR from 'swr';
import { MdOutlineDeleteSweep } from 'react-icons/md';
import { FaRegEdit } from 'react-icons/fa';

import { Post, User } from '@/types';
import ImageUpload from '../../../components/ImageUpload/ImageUpload';
import ConfirmationPopup from '../../../components/ConfirmationPopup/ConfirmationPopup';
import useConfirmationPopup from '../../hooks/useConfirmationPopup';
import useOutsideClick from '../../hooks/useOutsideClick';
import Button from '../../../components/Button/Button';
import { fetchPostsOfOneUser } from '@/utils/api/userAPIs';
import styles from '../posts.module.css';
import { useRouter } from 'next/navigation';

interface PostsProps {
  posts?: Post[];
  user: User;
  userPosts: Post[];
}

const Posts = ({ user, userPosts }: PostsProps) => {
  const router = useRouter();
  const [error, setError] = useState(null);
  console.log('user : ', user);
  console.log('userPosts : ', userPosts);

  const [currentPostId, setCurrentPostId] = useState(null);

  const { isOpen, requestConfirmation, handleClose, handleConfirm } =
    useConfirmationPopup();

  const popupRef = useRef<HTMLDivElement>(null);

  useOutsideClick(popupRef, () => {
    if (isOpen) handleClose();
  });

  const requestDelete = (id: string) => () => {
    requestConfirmation();
    setCurrentPostId(id);
  };

  const handleDelete = async (id: string) => {
    let response: Response;

    try {
      response = await fetch(`/api/posts/${id}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
      });

      if (!response.ok) {
        throw new Error('Failed to delete the post.');
      }
      toast.success('Post Deleted Successfully');
      mutate(); // Assuming mutate() is a method to revalidate data
      router.refresh();
    } catch (error) {
      console.error(error.message || 'Failed to delete the post');
      setError(error.message || 'Failed to delete the post');
    }
  };

  const fetcher = (...args) => fetch(...args).then((res) => res.json());

  const { data, mutate, isLoading } = useSWR(
    `/api/posts?username=${user.username}`,
    fetcher
  );

  return (
    <div className={styles.posts}>
      {!userPosts || userPosts.length === 0 ? (
        <p>you still haven't written a blog post</p>
      ) : (
        userPosts.map((post) => (
          <article className={styles.post} key={post.id}>
            <button
              className={styles.delete}
              role='button'
              aria-label={`Delete post ${post.title}`}
            ></button>
            <div className={styles.imgContainer}>
              <Image
                src={post.image}
                alt={`${post.title}`}
                width={200}
                height={100}
                className={styles.img}
              />
            </div>
            <h2 className={styles.postTitle}>{post.title}</h2>

            <button role='button' aria-label={`Edit post ${post.title}`}>
              <FaRegEdit />
            </button>
            <button
              id={post?.id}
              onClick={requestDelete(post.id)}
              role='button'
              aria-label={`Delete post ${post.title}`}
            >
              <MdOutlineDeleteSweep />
            </button>
          </article>
        ))
      )}

      <ConfirmationPopup
        ref={popupRef}
        isOpen={isOpen}
        onClose={handleClose}
        onConfirm={() => handleConfirm(() => handleDelete(currentPostId))}
        message={'The deletion of this post will be definitive.'}
      />
    </div>
  );
};

export default Posts;
