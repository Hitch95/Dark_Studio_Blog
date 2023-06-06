const { db } = require("./connectDB");
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcrypt');

async function createDB() {
    try {
        const connection = await db.classicConnection();

        // Suppression de la table si elle existe déjà
        await connection.query({ sql: "DROP TABLE IF EXISTS posts" });
        await connection.query({ sql: "DROP TABLE IF EXISTS users" });

        // Création des tables
        await connection.query({
            sql: `CREATE TABLE users(
            id VARCHAR(36) NOT NULL PRIMARY KEY,
            username VARCHAR(45) NOT NULL,
            email VARCHAR(255) NOT NULL,
            email_verified BOOLEAN NOT NULL DEFAULT false,
            password VARCHAR(255) NOT NULL,
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

        // Génération d'un UUID pour l'ID de l'utilisateur
        const userId = uuidv4();
        // Hachage du mot de passe avec Bcrypt
        const hashedPassword = await bcrypt.hash('password123', 10);
        // Insérer un utilisateur de test avec un UUID généré et le mot de passe haché
        await connection.query({
            sql: "INSERT INTO users (id, username, email, password, is_admin) VALUES (?, ?, ?, ?, ?)",
            values: [userId, 'JohnDoe', 'john@example.com', hashedPassword, 1]
        });

        // Génération d'un UUID pour l'ID du post
        const postId = uuidv4();
        // Insérer un post de test avec un UUID généré
        await connection.query({
            sql: "INSERT INTO posts (id, user_id, title, description, content, image) VALUES (?, ?, ?, ?, ?, ?)",
            values: [postId, userId, 'Mon premier post', 'Description de mon premier post', 'Contenu de mon premier post', 'https://example.com/image.jpg']
        });

        console.log("Utilisateur et post insérés avec succès !");
    } catch (error) {
        console.error(`Erreur lors de la création de la table : ${error}`);
    }
}

createDB();
