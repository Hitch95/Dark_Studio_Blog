'use client';

import { useState } from 'react';
import Image from 'next/image';

import { useAuth } from '../../hooks/useAuth';
import styles from './page.module.scss';
import { Post } from '@/types';

interface SinglePostProps {
  post: Post;
}

export default function SinglePost({ post }: SinglePostProps) {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(post?.title || '');
  const [description, setDescription] = useState(post?.description || '');

  const isAuthor = user?.id === post.user_id;

  if (!post) {
    return <div>Article non trouvé</div>;
  }

  return (
    <section className={styles.container}>
      <div className={styles.top}>
        {isAuthor && isEditing ? (
          <form className={styles.form}>
            <input
              className={styles.input}
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <textarea
              className={styles.textArea}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <button className={styles.button}>Enregistrer</button>
          </form>
        ) : (
          <article className={styles.info}>
            <h3 className={styles.title}>{post.title}</h3>
            <div className={styles.content}>
              <p className={styles.text}>{post.content}</p>
            </div>
            <p className={styles.desc}>{post.description}</p>
            <div className={styles.author}>
              <span className={styles.username}>{post.username}</span>
            </div>
            {post.image && (
              <figure className={styles.imageContainer}>
                <Image
                  src={post.image}
                  alt={`${post.title}`}
                  sizes="(max-width: 600px) 100vw, 600px"
                  fill
                  className={styles.image}
                />
              </figure>
            )}
          </article>
        )}
      </div>
    </section>
  );
}

// 'use client';

// import React, { useContext, useState, useEffect } from 'react';
// import { notFound, useRouter } from 'next/navigation';
// import Image from 'next/image';
// import Link from 'next/link';
// import { MdOutlineDeleteSweep } from 'react-icons/md';
// import { FaRegEdit } from 'react-icons/fa';

// import { getOnePost } from '@/utils/api';
// import { Post } from '../../../types';
// import styles from './page.module.scss';

// // async function updatePost(id, updatedData) {
// //     const res = await fetch(`http://localhost:3000/api/posts/${id}`, {
// //         method: "PUT",
// //         headers: {
// //             "Content-Type": "application/json",
// //         },
// //         body: JSON.stringify(updatedData),
// //     });

// //     if (!res.ok) {
// //         throw new Error("Failed to update post");
// //     }
// // }

// // async function getData(id) {
// //     const res = await fetch(`http://localhost:3000/api/posts/${id}`, {
// //         cache: "no-store",
// //     });

// //     if (!res.ok) {
// //         throw new Error("Post not found");
// //     }

// //     return res.json();
// // }

// // interface Post {
// //     id: string;
// //     title: string;
// //     content: string;
// //     description: string;
// //     username: string;
// //     image: string;
// //     createdAt: Date;
// //     updatedAt: Date;
// // };

// // async function getPost(id: string) {
// //   const post: Post = getOnePost(id);
// //   if (!post) notFound();
// //   return post;
// // }

// async function Post({ params: { id } }: { params: { id: string } }) {
//   const [data, setData] = useState({});
//   const [isAuthor, setIsAuthor] = useState(false);
//   const [title, setTitle] = useState('');
//   const [description, setDescription] = useState('');
//   const [shouldRedirect, setShouldRedirect] = useState(false);
//   const [shouldReload, setShouldReload] = useState(false);

//   const post = getOnePost(id);

//   //   const id = await.params.id;

//   // const handleDelete = async () => {
//   //     const res = await fetch(`http://localhost:3000/api/posts/${id}`, {
//   //         method: "DELETE",
//   //         headers: {
//   //             "Content-Type": "application/json",
//   //         },
//   //     });

//   //     if (!res.ok) {
//   //         throw new Error("Failed to Delete post");
//   //     } else {
//   //         alert("Post Deleted Successfully");
//   //         setShouldRedirect(true);
//   //     }
//   // };

//   // useEffect(() => {
//   //     if (shouldRedirect) {
//   //         router.push("/posts");
//   //     }
//   //     if (shouldReload) {
//   //         router.reload();
//   //     }
//   // }, [shouldRedirect, shouldReload ,router]);

//   //   const handleSave = async () => {
//   //     try {
//   //       const updatedData = {
//   //         title,
//   //         description,
//   //       };
//   //       await updatePost(id, updatedData);
//   //       setShouldReload(true);
//   //     } catch (error) {
//   //       console.error(error);
//   //     }
//   //   };

//   // useEffect(() => {
//   //     const fetchData = async () => {
//   //         try {
//   //             const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/posts/${id}`);
//   //             if (!res.ok) {
//   //                 throw new Error("Post not found");
//   //             }
//   //             const post = await res.json();
//   //             setData(post);
//   //         } catch (error) {
//   //             console.error("Error fetching post:", error);
//   //         }
//   //     };

//   //     if (id) {
//   //         fetchData();
//   //     }
//   // }, [id]);

//   //   useEffect(() => {
//   //     if (userData && userData.id) {
//   //       const isAuthor = userData.id === session?.data?.user?.id;
//   //       setIsAuthor(isAuthor);
//   //     }
//   //   }, [userData, session]);

//   return (
//     <section className={styles.container}>
//       {post && post.image && (
//         <div className={styles.top}>
//           {isAuthor ? (
//             <form className={styles.form}>
//               <input
//                 className={styles.input}
//                 type="text"
//                 value={title}
//                 onChange={(e) => setTitle(e.target.value)}
//               />
//               <textarea
//                 className={styles.textArea}
//                 cols="30"
//                 rows="10"
//                 type="text"
//                 value={description}
//                 onChange={(e) => setDescription(e.target.value)}
//               />
//               <button
//                 // onClick={handleSave}
//                 className={styles.button}
//               >
//                 Save
//               </button>
//             </form>
//           ) : (
//             <article className={styles.info}>
//               <h3 className={styles.title}>{post.title}</h3>
//               <div className={styles.content}>
//                 <p className={styles.text}>{post.content}</p>
//               </div>
//               <p className={styles.desc}>{post.description}</p>
//               <div className={styles.author}>
//                 <span className={styles.username}>{post.username}</span>
//               </div>
//               <figure className={styles.imageContainer}>
//                 <Image
//                   src={post.image}
//                   alt={post.image + ' alt'}
//                   // width={500} // Specify the width
//                   // height={300}
//                   sizes="(max-width: 600px) 100vw, 600px"
//                   // responsive
//                   fill
//                   className={styles.image}
//                 />
//               </figure>
//               {/* {(userData && userData?.id === data?.user_id) ||
//               userData?.isAdmin ? (
//                 <div className={styles.button_container}>
//                   <Link href={`/posts/edit/${id}`}>
//                     <button>
//                       <FaRegEdit />
//                     </button>
//                   </Link>
//                   <button onClick={handleDelete} className={styles.button}>
//                     <MdOutlineDeleteSweep />
//                   </button>
//                 </div>
//               ) : null} */}
//             </article>
//           )}
//         </div>
//       )}
//     </section>
//   );
// }

// export default Post;
