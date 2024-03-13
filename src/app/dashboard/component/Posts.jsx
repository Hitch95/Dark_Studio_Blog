import React, { useRef, useState } from "react";
import Image from "next/image";

import useSWR from "swr";

import styles from "../page.module.scss";
import ImageUpload from "../../../components/ImageUpload/ImageUpload";
import ConfirmationPopup from "../../../components/ConfirmationPopup/ConfirmationPopup";

import useConfirmationPopup from "../../hooks/useConfirmationPopup";
import useOutsideClick from "../../hooks/useOutsideClick";


export const generateMetadata = async ({ params }) => {
    const { id } = params;
    const post = await fetch(`http://localhost:3000/api/posts/${id}`);
    return {
        title: post.title,
        description: post.description,
    }
}

const Posts = ({ userData }) => {
    const [errorMessage, setError] = useState(null);
    const fetcher = (...args) => fetch(...args).then((res) => res.json());
    const [uploadedImage, setUploadedImage] = useState(null);
    const { isOpen, requestConfirmation, handleClose, handleConfirm } = useConfirmationPopup();
    const [currentPostId, setCurrentPostId] = useState(null);

    const popupRef = useRef();

    const { data, mutate, error, isLoading } = useSWR(
        `/api/posts?username=${userData.username}`,
        fetcher
    );

    useOutsideClick(popupRef, () => {
        if (isOpen) handleClose();
    });

    const requestDelete = (id) => () => {
        requestConfirmation();
        setCurrentPostId(id);
    };

    const handleDelete = async (id) => {
        try {
            await fetch(`/api/posts/${id}`, {
                method: "DELETE",
            });
            mutate();
        } catch (err) {
            console.error(err);
            setError("Failed to delete the post");
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const title = e.target[0].value;
        const description = e.target[1].value;
        const content = e.target[2].value;
        const image = uploadedImage;

        if (!title || !description || !image || !content) {
            setError("Please fill in all the fields");
            return;
        }

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
            e.target.reset();
            setError(null)
            setUploadedImage(null);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            <div className={styles.posts}>
                {isLoading ? (
                    "loading"
                ) : (
                    data?.map((post) => (
                        <article className={styles.post} key={post.id}>
                            <button
                                className={styles.delete}
                                onClick={requestDelete(post.id)}
                            >
                            </button>
                            <div className={styles.imgContainer}>
                                <Image src={post.image} alt={`${post.title}`} width={200} height={100} className={styles.img} />
                            </div>
                            <h2 className={styles.postTitle}>{post.title}</h2>
                        </article>
                    ))
                )}
            </div>

            <ConfirmationPopup
                ref={popupRef}
                isOpen={isOpen}
                onClose={handleClose}
                onConfirm={() => handleConfirm(() => handleDelete(currentPostId))}
                message={"The deletion of this post will be definitive."}
            />

            <form className={styles.form} onSubmit={handleSubmit}>
                <h1>Add New Post</h1>
                <input type="text" placeholder="Title" className={styles.input} />
                <input type="text" placeholder="Content" className={styles.input} />
                <textarea
                    placeholder="Description"
                    className={styles.textArea}
                    cols="30"
                    rows="10"
                    type="text"
                >
                </textarea>
                <ImageUpload onUpload={setUploadedImage} />
                {errorMessage && <span>{errorMessage}</span>}
                <button className={styles.button}>Send</button>
            </form>
        </div>
    )
}

export default Posts