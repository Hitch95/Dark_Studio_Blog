import React from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "./page.module.scss";

export default async function Post() {
    const posts = await getPost();
    return (
        <main className={styles.posts_container}>
            {posts.map((item) => (
                <Link href={`/posts/${item.id}`} className={styles.single_post_container} key={item.id}>
                    <figure className={styles.imageContainer}>
                        <Image
                            src={item.image} priority
                            alt=""
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

async function getPost() {
    const res = await fetch("http://localhost:3000/api/posts");
    if (!res.ok) {
        throw new Error("Failed to fetch data");
    }
    return res.json();
}
