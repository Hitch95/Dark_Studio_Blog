import React from "react";
import styles from "./page.module.scss";
import Image from "next/image";
import Button from "@/components/Button/Button";
import Link from "next/link";

const About = () => {
    return (
        <main className={styles.container} aria-label="About Page">
            <section className={styles.imgContainer}>
                <Image
                    src="https://images.pexels.com/photos/3194521/pexels-photo-3194521.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                    fill={true}
                    alt="An abstract representation of the tech industry"
                    className={styles.img}
                />
                <div className={styles.imgText}>
                    <h1 className={styles.imgTitle}>Tech. Blog</h1>
                    <h2 className={styles.imgDesc}>
                        High quality web articles about tech. industry
                    </h2>
                </div>
            </section>
            <section className={styles.textContainer}>
                <article className={styles.item}>
                    <h2 className={styles.title}>Who Are We?</h2>
                    <p className={styles.description}>
                        Dark Studio Blog is the media for digital professionals.
                        Published by <Link href={"https://github.com/Hitch95"}>Hitch95</Link> since 2023, it is aimed at web professionals. 
                        It offers them a daily selection of tools, decryptions, news or even figures and surveys 
                        to enable them to feed their monitoring and meet the needs induced by the growing digitization of professions and companies. 
                        SEO, SEA, development, design, social media or even marketing are among the topics regularly discussed. 
                        A reference source, the site welcomes more than 2000 readers per month.
                        Want to write to us? Send an email to the editor using this <Link href={"/contact"}>form</Link>.
                    </p>
                </article>
                <article className={styles.item}>
                    <h2 className={styles.title}>What We Do?</h2>
                    <div className={styles.description}>
                        Our teams of editors implement a daily watch on each news around the tech. industry in order to write quality articles. 
                        We also make it a point of honor to verify the quality of our sources.
                        Our themes :
                        <ul>
                            <li> - Tech</li>
                            <li> - Web</li>
                            <li> - Tools</li>
                        </ul>
                    </div>
                    <Button url="/contact" text="Contact" className={styles.button} />
                </article>
            </section>
        </main>
    );
};

export default About;
