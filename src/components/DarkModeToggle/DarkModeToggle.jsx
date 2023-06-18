"use client"

import React, { useContext } from "react";
import styles from "./darkModeToggle.module.scss";
import { ThemeContext } from "../../context/ThemeContext";


const DarkModeToggle = () => {
    const { toggle, mode } = useContext(ThemeContext);
    return (
        <div className={styles.dark_mode_toggle_container} onClick={toggle}>
            <div>🌙</div>
            <div>🔆</div>
            <div
                style={mode === "light" ? { left: "2px" } : { right: "2px" }}
            />
        </div>
    );
};

export default DarkModeToggle;