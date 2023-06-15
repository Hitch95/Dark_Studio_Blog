import React from "react";
import styles from "./page.module.css";
import Link from "next/link";

const Portfolio = () => {
    return (
        <div className={styles.container}>
            <h1 className={styles.selectTitle}>Choose a section</h1>
            <div className={styles.items}>
                <Link href="/portfolio/tech" className={styles.item}>
                    <span className={styles.title}>Tech</span>
                </Link>
                <Link href="/portfolio/web" className={styles.item}>
                    <span className={styles.title}>Web</span>
                </Link>
                <Link href="/portfolio/tools" className={styles.item}>
                    <span className={styles.title}>Tools</span>
                </Link>
            </div>
        </div>
    );
};

export default Portfolio;