import React from "react";
import styles from "./page.module.scss";
import Link from "next/link";
import Image from "next/image";

async function getData() {
    const res = await fetch("http://localhost:3000/api/posts", {
        cache: "no-store",
    });

    if (!res.ok) {
        throw new Error("Échec lors de la récupération des données");
    }
    return res.json();
}

const Post = async () => {
    const data = await getData();
    console.log("Data retrieved:", data);

    return (
        <main className={styles.posts_container}>
            {data.map((item) => (
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

export default Post;
