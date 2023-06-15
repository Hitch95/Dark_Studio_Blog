"use client"

import React, { useContext } from "react";
import { useSession } from "next-auth/react";
import styles from "./page.module.css";
import useSWR from "swr";
import { UserContext } from "@/context/UserContext";
import Image from "next/image";


const Posts = () => {
    const session = useSession();

    const { userData } = useContext(UserContext);


    const fetcher = (...args) => fetch(...args).then((res) => res.json());

    const { data, mutate, error, isLoading } = useSWR(
        `/api/posts`,
        fetcher
    );

    console.log('All Posts: ', data);

    if (session.status === "loading") {
        return <p>Loading...</p>;
    }

    if (session.status === "unauthenticated") {
        router?.push("/dashboard/login");
    }

    if (userData?.isAdmin === 0) {
        router?.push("/dashboard");
    }

    if (session.status === "authenticated") {

        return (
            <div className={styles.container}>
                {
                    data?.map((post) => (
                        <div className={styles.post} key={post.id}>
                            <Image src={post.image} width={100} height={100} alt="image" />
                            <div className={styles.detail}>
                                <p>{post.title}</p>
                                <p> by {post.username}</p>
                            </div>
                        </div>
                    ))
                }
            </div>
        );
    }
}

export default Posts