const { db } = require("./connectDB");
const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcrypt");

async function createDB() {
    try {
        const connection = await db.classicConnection();

        await connection.query({ sql: "DROP TABLE IF EXISTS posts" });
        await connection.query({ sql: "DROP TABLE IF EXISTS users" });

        await connection.query({
            sql: `CREATE TABLE users(
            id VARCHAR(36) NOT NULL PRIMARY KEY,
            username VARCHAR(45) NOT NULL,
            email VARCHAR(255) NOT NULL,
            email_verified BOOLEAN NOT NULL DEFAULT false,
            password VARCHAR(255) NOT NULL,
            image_src VARCHAR(255),
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL,
            updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
            is_admin BOOLEAN NOT NULL DEFAULT false
        )`});

        await connection.query({
            sql: `CREATE TABLE posts(
            id VARCHAR(36) NOT NULL PRIMARY KEY,
            user_id VARCHAR(36) NOT NULL,
            title VARCHAR(255) NOT NULL,
            description VARCHAR(1000) NOT NULL,
            content VARCHAR(255) NOT NULL,
            image VARCHAR(255) NOT NULL,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL,
            updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
            FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE
        )`});

        console.log("Tables créées avec succès !");

        const userId = uuidv4();
        const hashedPassword = await bcrypt.hash("password", 10);
        await connection.query({
            sql: "INSERT INTO users (id, username, email, password, image_src, is_admin) VALUES (?, ?, ?, ?, ?, ?)",
            values: [userId, "JohnDoe", "john@example.com", hashedPassword, "https://images.pexels.com/photos/4307869/pexels-photo-4307869.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1", 1]
        });
        const userId2 = uuidv4();
        await connection.query({
            sql: "INSERT INTO users (id, username, email, password, image_src) VALUES (?, ?, ?, ?, ?)",
            values: [userId2, "carlos", "carlos@mail.com", hashedPassword, "https://images.pexels.com/photos/4307869/pexels-photo-4307869.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"]
        });

        const postId = uuidv4();
        await connection.query({
            sql: "INSERT INTO posts (id, user_id, title, description, content, image) VALUES (?, ?, ?, ?, ?, ?)",
            values: [postId, userId, "First post ", "Description of the first post", "Content of the first post", "https://venngage-wordpress.s3.amazonaws.com/uploads/2020/10/Anatomy-of-the-Perfect-Blog-Post.png"],
        });

        const postId2 = uuidv4();
        await connection.query({
            sql: "INSERT INTO posts (id, user_id, title, description, content, image) VALUES (?, ?, ?, ?, ?, ?)",
            values: [postId2, userId, "Second post", "Description of the second post", "Content of the second post", "https://venngage-wordpress.s3.amazonaws.com/uploads/2020/10/Anatomy-of-the-Perfect-Blog-Post.png"],
        });

        const postId3 = uuidv4();
        await connection.query({
            sql: "INSERT INTO posts (id, user_id, title, description, content, image) VALUES (?, ?, ?, ?, ?, ?)",
            values: [postId3, userId, "Third post", "Description of the third post", "Content of the third post", "https://venngage-wordpress.s3.amazonaws.com/uploads/2020/10/Anatomy-of-the-Perfect-Blog-Post.png"],
        });

        console.log("Utilisateur et post insérés avec succès !");
    } catch (error) {
        console.error(`Erreur lors de la création de la table : ${error}`);
    }
}

createDB();
