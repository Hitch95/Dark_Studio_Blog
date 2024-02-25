import React from "react";
import styles from "./page.module.scss";
import Image from "next/image";
import Button from "../../components/Button/Button";

export const metadata = {
    title: "Dark Studio Blog Contact Information",
    description: "This is the Contact Page",
};

const Contact = () => {
    return (
        <main className={styles.container} aria-label="Contact Page">
            <h1 className={styles.title}>Let&apos;s Keep in Touch</h1>
            <section className={styles.content}>
                <div className={styles.imgContainer}>
                    <Image
                        src="/contact.png"
                        alt="Contact illustration"
                        fill={true}
                        className={styles.image}
                    />
                </div>
                <form className={styles.form} aria-label="Contact Form">
                    <label htmlFor="username" className={styles.label}></label>
                    <input type="text" id="username" placeholder="username" className={styles.input} />

                    <label htmlFor="email" className={styles.label}></label>
                    <input type="email" id="email" placeholder="email" className={styles.input} />

                    <label htmlFor="message" className={styles.label}></label>
                    <textarea
                        id="message"
                        className={styles.textArea}
                        placeholder="message"
                        cols="30"
                        rows="10"
                    >
                    </textarea>
                    <Button url="#" text="Send" />
                </form>
            </section>
        </main>
    );
};

export default Contact;