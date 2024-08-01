import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

console.log(process.env.MYSQL_URL);

const getPool = (() => {
    let pool;
    return async () => {
        if (!pool) {
            try {
                pool = await mysql.createPool(process.env.MYSQL_URL);
                const connection = await pool.getConnection();
                await connection.ping();
                connection.release();
            } catch (error) {
                console.error("Error creating connection pool:", error);
                throw error;
            }
        }
        return pool;
    }
})();

async function classicConnection() {
    try {
        const connection = await mysql.createConnection(process.env.MYSQL_URL);
        await connection.ping();
        return connection;
    } catch (error) {
        console.error("Error in connectDB file:", error);
        throw error;
    }
}

const db = {
    getPool,
    classicConnection,
};

export default db;