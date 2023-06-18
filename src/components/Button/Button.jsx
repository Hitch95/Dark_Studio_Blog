import React from "react";
import styles from "./button.module.scss";
import Link from "next/link";

const Button = ({ text, url }) => {
    return (
        <Link href={url}>
            <button className={styles.button_component}>{text}</button>
        </Link>
    );
};

export default Button;