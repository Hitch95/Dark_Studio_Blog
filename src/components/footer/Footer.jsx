import React from "react";
import styles from "./footer.module.css";
import Image from "next/image";
import Link from "next/link";

const Footer = () => {
    return (
        <div className={styles.container}>
            <div>©2023 Dark Studio All rights reserved.</div>
            <div className={styles.social}>
                <Link href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer">
                    <Image src="/1.png" width={15} height={15} className={styles.icon} alt="Dark Studio Facebook Account" />
                </Link>
                
                <Link href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer">
                    <Image src="/2.png" width={15} height={15} className={styles.icon} alt="Dark Studio" />
                </Link>

                <Link href="https://twitter.com/home" target="_blank" rel="noopener noreferrer">
                    <Image src="/3.png" width={15} height={15} className={styles.icon} alt="Dark Studio" />
                </Link>

                <Link href="https://www.youtube.com/" target="_blank" rel="noopener noreferrer">
                    <Image src="/4.png" width={15} height={15} className={styles.icon} alt="Dark Studio" />
                </Link>
            </div>
        </div>
    );
};

export default Footer;