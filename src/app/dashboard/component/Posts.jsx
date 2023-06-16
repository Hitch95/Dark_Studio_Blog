import React from "react"
import styles from "../page.module.css";
import useSWR from "swr";
import Image from "next/image";

const Posts = ({ userData }) => {
    const fetcher = (...args) => fetch(...args).then((res) => res.json());

    const { data, mutate, error, isLoading } = useSWR(
        `/api/posts?username=${userData.username}`,
        fetcher
    );

    setTimeout(() => {
        console.log("Data(posts): ", data);
    }, 3000);

    const handleDelete = async (id) => {
        try {
            await fetch(`/api/posts/${id}`, {
                method: "DELETE",
            });
            mutate();
        } catch (err) {
            console.log(err);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const title = e.target[0].value;
        const description = e.target[1].value;
        const image = e.target[2].value;
        const content = e.target[3].value;


        try {
            await fetch("/api/posts", {
                method: "POST",
                body: JSON.stringify({
                    title,
                    description,
                    image,
                    content,
                    user: userData,
                }),
            });
            mutate();
            e.target.reset()
        } catch (err) {
            console.log(err);
        }
    };
    return (
        <>
            <div className={styles.posts}>
                {isLoading ? (
                    "loading"
                ) : (
                    data?.map((post) => (
                        <div className={styles.post} key={post.id}>
                            <div className={styles.imgContainer}>

                                {/* <img src={post.image} className={styles.img} alt="" /> */}
                                <Image src={post.image} alt="" width={200} height={100} />
                            </div>
                            <h2 className={styles.postTitle}>{post.title}</h2>
                            <span
                                className={styles.delete}
                                onClick={() => handleDelete(post.id)}
                            >
                                X
                            </span>
                        </div>
                    ))
                )}
            </div>
            <form className={styles.new} onSubmit={handleSubmit}>
                <h1>Add New Post</h1>
                <input type="text" placeholder="Title" className={styles.input} />
                <input type="text" placeholder="Content" className={styles.input} />
                <input type="text" placeholder="Image" className={styles.input} />
                <textarea
                    placeholder="Description"
                    className={styles.textArea}
                    cols="30"
                    rows="10"
                    type="text"
                >
                </textarea>
                <button className={styles.button}>Send</button>
            </form>
        </>
    )
}

export default Posts