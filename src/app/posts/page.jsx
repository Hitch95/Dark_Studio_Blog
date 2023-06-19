import React from "react";
import styles from "./page.module.scss";
import Link from "next/link";
import Image from "next/image";

async function getData() {
    const res = await fetch("http://localhost:3000/api/posts", {
        cache: "no-store",
    });

    if (!res.ok) {
        throw new Error("Échec de la récupération des données");
    }
    return res.json();
}

const Post = async () => {
    const data = await getData();
    console.log("Data retrieved:", data);

    return (
        <div className={styles.posts_container}>
            {data.map((item) => (
                <Link href={`/posts/${item.id}`} className={styles.single_post_container} key={item.id}>
                    <div className={styles.imageContainer}>
                        <Image
                            src={item.image} priority
                            alt=""
                            width={400}
                            height={250}
                            className={styles.image}
                        />
                    </div>
                    <div className={styles.content}>
                        <h1 className={styles.title}>{item.title}</h1>
                        <p className={styles.desc}>{item.description}</p>
                    </div>
                </Link>
            ))}
        </div>
    );
};

export default Post;
