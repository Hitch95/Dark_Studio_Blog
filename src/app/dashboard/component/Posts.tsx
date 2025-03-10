'use client';

import Image from 'next/image';
import { User } from '@supabase/supabase-js';
import { Post } from '@/types';

import useSWR from 'swr';

import styles from '../page.module.scss';
import ImageUpload from '../../../components/ImageUpload/ImageUpload';
import ConfirmationPopup from '../../../components/ConfirmationPopup/ConfirmationPopup';

import useConfirmationPopup from '../../hooks/useConfirmationPopup';
import useOutsideClick from '../../hooks/useOutsideClick';
import Button from '../../../components/Button/Button';
import toast from 'react-hot-toast';

interface PostsProps {
  posts: Post[];
  user: User;
}

const Posts = ({ posts, user }: PostsProps) => {
  // const [errorMessage, setErrorMessage] = useState(null);
  // const [uploadedImage, setUploadedImage] = useState(null);
  // const [resetUploadImage, setResetUploadImage] = useState(false);
  // const [currentPostId, setCurrentPostId] = useState(null);

  // const { isOpen, requestConfirmation, handleClose, handleConfirm } =
  //   useConfirmationPopup();

  // const popupRef = useRef();

  // useOutsideClick(popupRef, () => {
  //   if (isOpen) handleClose();
  // });

  // const requestDelete = (id) => () => {
  //   requestConfirmation();
  //   setCurrentPostId(id);
  // };

  // const handleDelete = async (id) => {
  //     let response;

  //     try {
  //         response = await fetch(`/api/posts/${id}`, {
  //             method: "DELETE",
  //             headers: { "Content-Type": "application/json" },
  //         });

  //         if (!response.ok) {
  //             throw new Error("Failed to delete the post.");
  //         }
  //         toast.success("Post Deleted Successfully");
  //         mutate(); // Assuming mutate() is a method to revalidate data
  //         router.refresh();
  //     } catch (error) {
  //         console.error(error.message || "Failed to delete the post");
  //         setErrorMessage(error.message || "Failed to delete the post");
  //     }
  // };

  // const fetcher = (...args) => fetch(...args).then((res) => res.json());

  // eslint-disable-next-line no-unused-vars
  // const { data, mutate, error, isLoading } = useSWR(
  //     `/api/posts?username=${userData.username}`,
  //     fetcher
  // );

  // const handleSubmit = async (e) => {
  //     e.preventDefault();
  //     const title = e.target[0].value;
  //     const description = e.target[1].value;
  //     const content = e.target[2].value;
  //     const image = uploadedImage;

  //     if (!title || !description || !image || !content) {
  //         setErrorMessage("Please fill in all the fields");
  //         return;
  //     }

  //     try {
  //         await fetch("/api/posts", {
  //             method: "POST",
  //             body: JSON.stringify({
  //                 title,
  //                 description,
  //                 image,
  //                 content,
  //                 user: userData,
  //             }),
  //         });
  //         mutate();
  //         e.target.reset();
  //         setErrorMessage(null)
  //         setUploadedImage(null);
  //         setResetUploadImage(prev => !prev);
  //     } catch (error) {
  //         console.error(error);
  //     }
  // };

  return (
    <div className={styles.posts}>
      {posts.length === 0 ? (
        <p>you still haven't written a blog post</p>
      ) : (
        posts.map((post) => (
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
          </article>
        ))
      )}

      {/* <ConfirmationPopup
            ref={popupRef}
            isOpen={isOpen}
            onClose={handleClose}
            onConfirm={() => handleConfirm(() => handleDelete(currentPostId))}
            message={'The deletion of this post will be definitive.'}
          /> */}

      <form className={styles.form}>
        <h1>Add New Post</h1>
        <input type='text' placeholder='Title' className={styles.input} />
        <input type='text' placeholder='Content' className={styles.input} />
        <textarea
          placeholder='Description'
          className={styles.textArea}
          cols={30}
          rows={10}
        ></textarea>
        {/* <ImageUpload
          onUpload={setUploadedImage}
          resetUploadImage={resetUploadImage}
        /> */}
        {/* {errorMessage && <span>{errorMessage}</span>} */}
        <Button text={'Send'}></Button>
      </form>
    </div>
  );
};

export default Posts;
