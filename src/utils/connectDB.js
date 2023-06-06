const mysql = require("mysql2/promise");
const dotenv = require("dotenv");

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

module.exports = { db };
