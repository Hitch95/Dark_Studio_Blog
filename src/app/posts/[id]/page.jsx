"use client";

import React, { useContext, useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { notFound } from "next/navigation";
import Image from "next/image";

import { UserContext } from "../../../context/UserContext";
import styles from "./page.module.css";



async function getData(id) {
    const res = await fetch(`http://localhost:3000/api/posts/${id}`, {
        cache: "no-store",
    });

    if (!res.ok) {
        return notFound()
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

/*
export async function generateMetadata({ params }) {

    const post = await getData(params.id)
    return {
        title: post.title,
        description: post.description,
    };
}
*/

const BlogPost = ({ params }) => {
    const [data, setData] = useState({});
    const [isAuthor, setIsAuthor] = useState(false);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [isEditing, setIsEditing] = useState(false);

    const router = useRouter();
    const { id } = params;

    const { data: session } = useSession();
    const { userData } = useContext(UserContext);

    const handleEdit = () => {
        setTitle(data.title);
        setDescription(data.description);
        setIsEditing(true);
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
        <div>
            {data && (
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
                        <div className={styles.info}>
                            <h1 className={styles.title}>{data.title}</h1>
                            <p className={styles.desc}>{data.description}</p>
                            <div className={styles.author}>
                                <span className={styles.username}>{data.username}</span>
                            </div>
                            <button onClick={handleEdit} className={styles.button}>Edit</button>
                        </div>
                    )}
                    <div className={styles.imageContainer}>
                        <Image
                            src={data.image}
                            alt=""
                            sizes="(max-width: 623px) 100vw"
                            fill={true}
                            className={styles.image}
                        />
                    </div>
                </div>
            )}

            <div className={styles.content}>
                <p className={styles.text}>{data.content}</p>
            </div>
        </div>
    );
};

export default BlogPost;