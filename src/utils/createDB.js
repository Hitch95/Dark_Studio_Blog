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
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL,
            updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
            is_admin BOOLEAN NOT NULL DEFAULT false
        )`});

        await connection.query({
            sql: `CREATE TABLE posts(
            id VARCHAR(36) NOT NULL PRIMARY KEY,
            user_id VARCHAR(36) NOT NULL,
            title VARCHAR(255) NOT NULL,
            description VARCHAR(1500) NOT NULL,
            content VARCHAR(255) NOT NULL,
            image VARCHAR(255) NOT NULL,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL,
            updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
            username VARCHAR(255),
            FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE
        )`});

        console.log("Tables created with success!");

        const userId = uuidv4();
        const hashedPassword = await bcrypt.hash("Password1++", 10);
        await connection.query({
            sql: "INSERT INTO users (id, username, email, password, is_admin) VALUES (?, ?, ?, ?, ?)",
            values: [userId, "JohnDoe", "john@example.com", hashedPassword, 1]
        });
        const userId2 = uuidv4();
        await connection.query({
            sql: "INSERT INTO users (id, username, email, password) VALUES (?, ?, ?, ?)",
            values: [userId2, "carlosGhosn", "carlos@mail.com", hashedPassword]
        });

        const postId = uuidv4();
        await connection.query({
            sql: "INSERT INTO posts (id, user_id, title, description, content, image, username) VALUES (?, ?, ?, ?, ?, ?, ?)",
            values: [
                postId,
                userId,
                `Study: how developers perceive AI tools`,
                `A Stack Overflow study found that 44% of developers are integrating AI into their development processes, and 26% plan to adopt it soon. 
                Of those learning to code, 55% are already using AI tools.
                French and German developers are more reluctant, with 61.4% and 63.9% respectively using or planning to use AI, compared to 83.6% in India and 78.0% in Brazil.
                Developers recognize the potential benefits of AI, especially in terms of increased productivity (32.81%), but only 3.75% believe that it improves collaborative work. 
                Common use cases include writing code (83%) and debugging (49%). Blockchain, data and full-stack developers are more inclined to use AI tools.
                The developers anticipate significant changes with AI. About 77% expect differences in code writing and 75% in debugging practices. 
                Collaboration with colleagues is perceived as the area with the least expected evolution, but 59.38% still believe that AI will bring about change.`, 
                `Developers have already started using AI and its use is expected to grow even further in the future.
                Source: StackOverflow`,
                `https://f.hellowork.com/blogdumoderateur/2023/06/Benefits-IA-Developpeurs.jpg`,
                `JohnDoe`
            ],
        });

        const postId2 = uuidv4();
        await connection.query({
            sql: "INSERT INTO posts (id, user_id, title, description, content, image, username) VALUES (?, ?, ?, ?, ?, ?, ?)",
            values: [
                postId2, 
                userId, 
                `Double authentication: definition and methods to know`, 
                `The traditional username and password authentication method is vulnerable and becoming obsolete. 
                A 9 characters password can be cracked within 6 hours. 
                Double authentication methods provide an additional layer of protection.
                Three methods exist: SMS, application, and security key.
                SMS double authentication involves providing your phone number to receive a one-time code via SMS. 
                It's easy to set up but not the most secure. 
                Connection notification sends a smartphone notification for new device logins, with validation done through the notification. 
                The two-factor authentication application offers high security and convenience. 
                After installing the app, you activate 2-FA, scan a QR code, and get a unique 6-digit code every 30 seconds. 
                Authentication keys provide the highest security level but have restrictions. 
                A USB device is inserted during login, requiring physical possession. 
                These methods improve security compared to traditional authentication.`, 
                `Double authentication provides better security for your accounts. Learn about the different methods available.`, 
                `https://f.hellowork.com/blogdumoderateur/2023/05/Authentification-deux-facteurs-2FA.jpg`,
                `carlosGhosn`
            ],
        });

        const postId3 = uuidv4();
        await connection.query({
            sql: "INSERT INTO posts (id, user_id, title, description, content, image, username) VALUES (?, ?, ?, ?, ?, ?, ?)",
            values: [
                postId3, 
                userId, 
                `Micro-interactions in UX design: small details, big impact!`, 
                `Interaction design involves two-way exchanges between the user and the product, while solitary design remains unidirectional. 
                There is no type of design that is better than the other, it depends on the context. 
                Interactive design has evolved into a discipline in its own right called IxD design.
                Micro-interactions play an essential role in interaction design. 
                They represent small moments and details that fit harmoniously into the overall design of the product. 
                An effective micro-interaction must be natural and almost invisible.
                A micro-interaction generally follows the following structure:
                The trigger: it can be manual, voice, gesture or system-based.
                Rules: they define how the user interacts with the product and what happens when the micro-interaction is triggered.
                Feedback: it informs the user of the consequences of the micro-interaction, whether visually, audibly or sensorily.
                Modes and Loops: Modes allow basic rules to be changed to suit the user, while loops make micro-interaction durable and reusable.
                To create effective micro-interactions, it is recommended to simplify the interactions with the product, 
                to make them subtle and simple, to understand the needs of the users and to integrate them from the beginning of the design process.`, 
                `Discreet and subtle, micro-interactions are part of our daily lives. Back to this key element of UX design!`, 
                `https://f.hellowork.com/blogdumoderateur/2023/06/ux-design-micro-interactions-interactivity.jpg`,
                `JohnDoe`
            ],
        });

        console.log("Users and posts insert with success!");
    } catch (error) {
        console.error(`Error in the creation of the table : ${error}`);
    }
}

createDB();
