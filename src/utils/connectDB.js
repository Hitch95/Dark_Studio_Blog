import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

async function classicConnection() {
    try {
        return await mysql.createConnection(process.env.MYSQL_URL);
    } catch (error) {
        console.error("Error creating classic connection:", error);
        throw error;
    }
}

let pool;
try {
    pool = mysql.createPool(process.env.MYSQL_URL);
} catch (error) {
    console.error("Error creating connection pool:", error);
    throw error;
}

const db = {
    pool,
    classicConnection,
};

export default db;
