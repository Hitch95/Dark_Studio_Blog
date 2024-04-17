"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "./page.module.scss";
import { getAllPosts } from "../../utils/api";

const Posts = () => {
    const [posts, setPosts] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        getAllPosts()
            .then(setPosts)
            .catch(error => {
                console.error('Failed to load posts:', error.message);
                setError('Failed to load posts: ' + error.message);
            });
    }, []);

    if (error) {
        return <p>{error}</p>;
    }

    if (posts.length === 0) {
        return <p>Loading posts...</p>;
    }

    return (
        <main className={styles.posts_container}>
            {posts.map((item) => (
                <Link href={`/posts/${item.id}`} className={styles.single_post_container} key={item.id}>
                    <figure className={styles.imageContainer}>
                        <Image
                            src={item.image || 'default_image_url_here'} // Provide a default image URL or handle null case
                            priority
                            alt={item.title || 'No title'} // Provide default text or handle null case
                            width={400}
                            height={250}
                            className={styles.image}
                        />
                    </figure>
                    <div className={styles.content}>
                        <h3 className={styles.title}>{item.title}</h3>
                        <p className={styles.desc}>{item.description}</p>
                    </div>
                </Link>
            ))}
        </main>
    );
};

export default Posts;
