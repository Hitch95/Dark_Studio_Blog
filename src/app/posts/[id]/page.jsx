"use client"

import React, { useContext, useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

import { MdOutlineDeleteSweep } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";
import { UserContext } from "../../../context/UserContext";
import styles from "./page.module.scss";
import { deletePost, fetchPost } from "../../api/utils/api";
import EditPost from "../../../components/EditPost/EditPost";

// Need to resolve "use client" problem for this to work

// export async function generateMetadata({ params }) {
//     const response = await fetch(`http://localhost:3000/api/posts/${params.id}`);
//     const post = await response.json();

//     return {
//         title: post.title,
//         description: post.description,
//         author: post.username,
//     }
// }

const BlogPost = ({ params }) => {
    const [data, setData] = useState({});
    const [isAuthor, setIsAuthor] = useState(false);

    const router = useRouter();
    const { id } = params;

    const { data: session } = useSession();
    const { userData } = useContext(UserContext);

    const handleDelete = async () => {
        try {
            await deletePost(id);
            alert("Post Deleted Successfully");
            router.refresh();
        } catch (error) {
            console.error('Failed to delete post: ', error);
        }
    };

    // This useEffect hook is used for fetching the post data based on the post's ID. 
    // It's essential if your component needs to display the current state of a post and should run whenever the id changes.
    useEffect(() => {
        if (id) {
            fetchPost(id).then(setData).catch(console.error);
        }
    }, [id]);

    
    useEffect(() => {
        if (userData && session?.user) {
            setIsAuthor(userData.id === session.user.id);
        }
    }, [userData, session]);

    return (
        <section className={styles.container}>
            {data && data.image && (
                <div className={styles.top}>
                    {isAuthor ? (
                        <EditPost post={data} onSave={() => router.replace(`/posts/${id}`)} />
                    ) : (
                        <article className={styles.info}>
                            <h3 className={styles.title}>{data.title}</h3>
                            <div className={styles.content}>
                                <p className={styles.text}>{data.content}</p>
                            </div>
                            <p className={styles.desc}>{data.description}</p>
                            <div className={styles.author}>
                                <span className={styles.username}>{data.username}</span>
                            </div>
                            <figure className={styles.imageContainer}>
                                <Image
                                    src={data.image}
                                    alt={data.image + " alt"}
                                    // width={500} // Specify the width
                                    // height={300}
                                    sizes="(max-width: 600px) 100vw, 600px"
                                    // responsive
                                    fill
                                    className={styles.image}
                                />
                            </figure>
                            {(userData && userData?.id === data?.user_id) || userData?.isAdmin ? (
                                <div className={styles.button_container}>
                                    <Link href={`/posts/edit/${id}`}>
                                        <button>
                                            <FaRegEdit />
                                        </button>
                                    </Link>
                                    <button
                                        onClick={handleDelete}
                                        className={styles.button}
                                    >
                                        <MdOutlineDeleteSweep />
                                    </button>
                                </div>
                            ) : null}
                        </article>
                    )}
                </div>
            )}
        </section>
    );
};

export default BlogPost;
