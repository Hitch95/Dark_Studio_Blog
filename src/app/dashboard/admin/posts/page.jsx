"use client"

import React, { useContext } from "react";
import { useSession } from "next-auth/react";
import styles from "./page.module.scss";
import useSWR from "swr";
import { UserContext } from "@/context/UserContext";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

const Posts = () => {
    const router = useRouter()
    const handleDelete = async (e) => {
        const id = e.target.id
        const res = await fetch(`http://localhost:3000/api/posts/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
        });
        if (!res.ok) {
            throw new Error("Failed to Delete post");
        }
        else {
            alert("Post Deleted Successfully");
            router.reload()
        }
    }

    const session = useSession();

    const { userData } = useContext(UserContext);

    const fetcher = (...args) => fetch(...args).then((res) => res.json());

    const { data, mutate, error, isLoading } = useSWR(
        `/api/posts`,
        fetcher
    );

    console.log('All Posts: ', data);

    switch (session.status) {
        case "loading":
            return <p>Loading...</p>;
        case "unauthenticated":
            router?.push("/dashboard/login");
            break;
        case "authenticated":
            if (userData?.isAdmin === 0) {
                router?.push("/dashboard");
            }
            console.log(data, "data")

            return (
                <main className={styles.container} aria-label="Posts List">
                    {data?.map((post) => (
                        <article className={styles.post} key={post.id}>
                            <Image src={post.image} width={200} height={200} alt={post.title} />

                            <div className={styles.postContent}>
                                <header className={styles.detail}>
                                    <h2>{post.title}</h2>
                                    <p>by <strong>{post.username}</strong></p>
                                </header>
                                {(userData && userData?.id === post?.user_id) || userData?.isAdmin ? (
                                    <div className={styles.button_container}>
                                        <Link href={`/posts/edit/${post?.id}`} className={styles.link}>
                                            <button>Edit</button>
                                        </Link>
                                        <button
                                            id={post?.id}
                                            onClick={handleDelete}
                                            role="button"
                                            aria-label={`Delete post ${post.title}`}
                                        >
                                            Delete
                                        </button>
                                    </div>
                                ) : null}
                            </div>
                        </article>
                    ))}
                </main>
            )
    }
}

export default Posts;