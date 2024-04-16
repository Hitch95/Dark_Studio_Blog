import React from "react";
import styles from "./button.module.scss";

const Button = ({ text, onClick }) => {
    return (
    <button className={styles.button_component}>{text}</button>
    );
};

export default Button;