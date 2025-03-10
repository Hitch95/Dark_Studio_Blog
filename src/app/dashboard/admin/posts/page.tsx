'use client';

// import React, { useState, useEffect, useContext, useRef } from 'react';
// import Image from 'next/image';
// import Link from 'next/link';
// import { useRouter } from 'next/navigation';
// import useSWR from 'swr';
// import toast from 'react-hot-toast';
// import { MdOutlineDeleteSweep } from 'react-icons/md';
// import { FaRegEdit } from 'react-icons/fa';

// import ConfirmationPopup from '../../../../components/ConfirmationPopup/ConfirmationPopup';
// import useConfirmationPopup from '../../../hooks/useConfirmationPopup';
// import useOutsideClick from '../../../hooks/useOutsideClick';
import styles from './page.module.scss';

const Posts = () => {
  //   const [errorMessage, setErrorMessage] = useState(null);
  //   const [currentPostId, setCurrentPostId] = useState(null);
  //   const [shouldRedirect, setShouldRedirect] = useState(false);

  //   const router = useRouter();

  //   const { isOpen, requestConfirmation, handleClose, handleConfirm } =
  //     useConfirmationPopup();

  //   const popupRef = useRef();

  //   // Fetcher function for useSWR
  //   const fetcher = (...args) => fetch(...args).then((res) => res.json());
  //   // SWR hook for fetching posts data
  //   const { data, mutate, error, isLoading } = useSWR(`/api/posts`, fetcher);

  //   useOutsideClick(popupRef, () => {
  //     if (isOpen) handleClose();
  //   });

  //   const requestDelete = (id) => () => {
  //     requestConfirmation();
  //     setCurrentPostId(id);
  //   };

  //   const handleDelete = async (id) => {
  //     let response;

  //     try {
  //       response = await fetch(`/api/posts/${id}`, {
  //         method: 'DELETE',
  //         headers: { 'Content-Type': 'application/json' },
  //       });

  //       if (!response.ok) {
  //         throw new Error('Failed to delete the post.');
  //       }

  //       // alert("Post Deleted Successfully"); // Toast for this in the future
  //       toast('Post Deleted Successfully');
  //       mutate();
  //       setShouldRedirect(true);
  //     } catch (error) {
  //       console.error(error.message || 'Failed to delete the post');
  //       setErrorMessage(error.message || 'Failed to delete the post');
  //     }
  //   };

  //   useEffect(() => {
  //     if (shouldRedirect) {
  //       router.push('/posts');
  //     }
  //   }, [shouldRedirect, router]);

  //   // const session = useSession();

  //   const { userData } = useContext(UserContext);

  //   console.log('All Posts: ', data);

  //   switch (session.status) {
  //     case 'loading':
  //       return <p>Loading...</p>;
  //     case 'unauthenticated':
  //       router?.push('/dashboard/login');
  //       break;
  //     case 'authenticated':
  //       if (userData?.isAdmin === 0) {
  //         router?.push('/dashboard');
  //       }
  //       console.log(data, 'data');

  return (
    <main className={styles.container} aria-label='Posts List'>
      {/* {data?.map((post) => (
            <article className={styles.post} key={post.id}>
              <Image
                src={post.image}
                width={200}
                height={200}
                alt={post.title}
              />

              <div className={styles.postContent}>
                <header className={styles.detail}>
                  <h2>{post.title}</h2>
                  <p>
                    by <strong>{post.username}</strong>
                  </p>
                </header>
                {(userData && userData?.id === post?.user_id) ||
                userData?.isAdmin ? (
                  <div className={styles.button_container}>
                    <Link
                      href={`/posts/edit/${post?.id}`}
                      className={styles.link}
                    >
                      <button
                        role="button"
                        aria-label={`Edit post ${post.title}`}
                      >
                        <FaRegEdit />
                      </button>
                    </Link>
                    <button
                      id={post?.id}
                      onClick={requestDelete(post.id)}
                      role="button"
                      aria-label={`Delete post ${post.title}`}
                    >
                      <MdOutlineDeleteSweep />
                    </button>
                  </div>
                ) : null}
              </div>
            </article>
          ))}
          <ConfirmationPopup
            ref={popupRef}
            isOpen={isOpen}
            onClose={handleClose}
            onConfirm={() => handleConfirm(() => handleDelete(currentPostId))}
            message={'The deletion of this post will be definitive.'}
          /> */}
      <h3>This is the admin page</h3>
    </main>
  );
};

export default Posts;
