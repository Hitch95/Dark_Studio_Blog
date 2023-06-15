"use client";

import { createContext, useState } from "react";


export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [userData, setUserData] = useState();

    const fetchUser = async (email) => {

        try {
            const response = await fetch("/api/user", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email: email }),
            });

            if (response.ok) {
                const data = await response.json();
                setUserData(data);
                console.log("Data: ", data);
            } else {
                console.log("Error:", response.status);
            }
        } catch (error) {
            console.log("Error While Fetching User:", error);
        }

    };

    return (
        <UserContext.Provider value={{ fetchUser, userData }}>
            <div>{children}</div>
        </UserContext.Provider>
    );
};