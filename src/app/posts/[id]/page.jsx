"use client";

import React, { useContext, useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

import { UserContext } from "../../../context/UserContext";
import styles from "./page.module.scss";


async function getData(id) {
    const res = await fetch(`http://localhost:3000/api/posts/${id}`, {
        cache: "no-store",
    });

    if (!res.ok) {
        throw new Error("Post not found");
    }

    return res.json();
}

async function updatePost(id, updatedData) {
    const res = await fetch(`http://localhost:3000/api/posts/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedData),
    });

    if (!res.ok) {
        throw new Error("Failed to update post");
    }
}

const BlogPost = ({ params }) => {
    const [data, setData] = useState({});
    const [isAuthor, setIsAuthor] = useState(false);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    const router = useRouter();
    const { id } = params;

    const { data: session } = useSession();
    const { userData } = useContext(UserContext);

    const handleDelete = async () => {
        const res = await fetch(`http://localhost:3000/api/posts/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (!res.ok) {
            throw new Error("Failed to Delete post");
        } else {
            alert("Post Deleted Successfully");
            router.push("/posts");
        }
    };

    const handleSave = async () => {
        try {
            const updatedData = {
                title,
                description,
            };
            await updatePost(id, updatedData);
            router.reload();
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch(`http://localhost:3000/api/posts/${id}`);
                if (!res.ok) {
                    throw new Error("Post not found");
                }
                const post = await res.json();
                setData(post);
            } catch (error) {
                console.error("Error fetching post:", error);
            }
        };

        if (id) {
            fetchData();
        }
    }, [id]);

    useEffect(() => {
        if (userData && userData.id) {
            const isAuthor = userData.id === session?.data?.user?.id;
            setIsAuthor(isAuthor);
        }
    }, [userData, session]);

    return (
        <section className={styles.container}>
            {data && data.image && (
                <div className={styles.top}>
                    {isAuthor ? (
                        <form className={styles.form}>
                            <input
                                className={styles.input}
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            />
                            <textarea
                                className={styles.textArea}
                                cols="30"
                                rows="10"
                                type="text"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                            <button onClick={handleSave} className={styles.button}>
                                Save
                            </button>
                        </form>
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
                                    fill={true}
                                    // sizes="(max-width: 600px) 100vw, 600px"
                                    layout="fill"
                                    className={styles.image}
                                />
                            </figure>
                            {(userData && userData?.id === data?.user_id) || userData?.isAdmin ? (
                                <div className={styles.button_container}>
                                    <Link href={`/posts/edit/${id}`}>
                                        <button>
                                            Edit
                                        </button>
                                    </Link>
                                    <button
                                        onClick={handleDelete}
                                        className={styles.button}
                                    >
                                        Delete
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
