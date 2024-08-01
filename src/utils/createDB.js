import db from "./connectDB.js";
import { v4 as uuidv4 } from 'uuid';
import bcrypt from "bcrypt";

async function createDB() {
    let connection;
    try {
        const connection = await db.classicConnection();

        await connection.query("DROP TABLE IF EXISTS roles_id");
        await connection.query("DROP TABLE IF EXISTS roles");
        await connection.query("DROP TABLE IF EXISTS posts");
        await connection.query("DROP TABLE IF EXISTS users");

        await connection.query(
            `CREATE TABLE users(
            id VARCHAR(36) NOT NULL PRIMARY KEY,
            username VARCHAR(45) NOT NULL,
            email VARCHAR(255) NOT NULL,
            email_verified BOOLEAN NOT NULL DEFAULT false,
            password VARCHAR(255) NOT NULL,
            image_src VARCHAR(255),
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL,
            updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
            is_admin BOOLEAN NOT NULL DEFAULT false
        )`);

        await connection.query(
            `CREATE TABLE posts(
            id VARCHAR(36) NOT NULL PRIMARY KEY,
            user_id VARCHAR(36) NOT NULL,
            title VARCHAR(255) NOT NULL,
            description VARCHAR(1500) NOT NULL,
            content VARCHAR(255) NOT NULL,
            username VARCHAR(255) NOT NULL,
            image VARCHAR(255) NOT NULL,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL,
            updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
            FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE
        )`);

        await connection.query(`CREATE TABLE roles(
            id VARCHAR(36) NOT NULL PRIMARY KEY,
            name VARCHAR(36) NOT NULL
        )`);

        await connection.query(
            `CREATE TABLE roles_id(
            id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
            user_id VARCHAR(36) NOT NULL,
            role_id VARCHAR(36) NOT NULL,
            FOREIGN KEY(user_id) REFERENCES users(id),
            FOREIGN KEY(role_id) REFERENCES roles(id)
        )`);

        console.log("Tables créées avec succès !");


        const hashedPassword = await bcrypt.hash("Password1++", 10);

        const userId = uuidv4();
        await connection.query(
            "INSERT INTO users (id, username, email, password, is_admin) VALUES (?, ?, ?, ?, ?)",
            [userId, 'JohnDoe', 'john@example.com', hashedPassword, 1]
        );

        const userId2 = uuidv4();
        await connection.query(
            "INSERT INTO users (id, username, email, password) VALUES (?, ?, ?, ?)",
            [userId2, 'carlosGhosn', 'carlos@mail.com', hashedPassword]
        );


        const postId = uuidv4();
        await connection.query(
            "INSERT INTO posts (id, user_id, title, description, content, image, username) VALUES (?, ?, ?, ?, ?, ?, ?)",
            [
                postId,
                userId,
                `Study: how developers perceive AI tools`,
                `A Stack Overflow study found that 44% of developers are integrating AI into their development processes, and 26% plan to adopt it soon. 
                Of those learning to code, 55% are already using AI tools.
                French and German developers are more reluctant, with 61.4% and 63.9% respectively using or planning to use AI, compared to 83.6% in India and 78.0% in Brazil.
                Developers recognize the potential benefits of AI, especially in terms of increased productivity (32.81%), but only 3.75% believe that it improves collaborative work. 
                Common use cases include writing code (83%) and debugging (49%). Blockchain, data and full-stack developers are more inclined to use AI tools.
                The developers anticipate about 77% expect differences in code writing and 75% in debugging practices. 
                Collaboration with colleagues is perceived as the area with the least expected evolution, but 59.38% still believe that AI will bring about change.`,
                `Developers have already started using AI and its use is expected to grow even further in the future. Source: StackOverflow`,
                `https://f.hellowork.com/blogdumoderateur/2023/06/Benefits-IA-Developpeurs.jpg`,
                `JohnDoe`
            ]
        );

        const postId2 = uuidv4();
        await connection.query(
            "INSERT INTO posts (id, user_id, title, description, content, image, username) VALUES (?, ?, ?, ?, ?, ?, ?)",
            [
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
            ]
        );

        const postId3 = uuidv4();
        await connection.query(
            "INSERT INTO posts (id, user_id, title, description, content, image, username) VALUES (?, ?, ?, ?, ?, ?, ?)",
            [
                postId3,
                userId,
                'Micro-interactions in UX design: small details, big impact!',
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
                'Discreet and subtle, micro-interactions are part of our daily lives. Back to this key element of UX design!',
                'https://f.hellowork.com/blogdumoderateur/2023/06/ux-design-micro-interactions-interactivity.jpg',
                'JohnDoe'
            ]
        );

        const postId4 = uuidv4();
        await connection.query(
            "INSERT INTO posts (id, user_id, title, description, content, image, username) VALUES (?, ?, ?, ?, ?, ?, ?)",
            [
                postId4,
                userId,
                `Tech salaries 2023: what are the best paid jobs in Paris and in the region?`,
                `In 2023, Silkhom, a recruitment firm specializing in tech, published a study on salaries in IT, electronics and digital. 
                The study, based on more than 15,000 candidates, reveals wage gaps between Paris and the big cities, which widen with experience. 
                Some trades have seen significant increases since 2022, while others have had more modest increases. 
                DevOps, SRE, and cloud engineer positions offer the most attractive entry-level salaries. 
                DSI, RSSI and CTO/R&D jobs are interesting for senior profiles. 
                In summary, here are some salaries in 2023: 
                Python developer (35k-40k€ junior, up to 65k-75k€ senior), 
                data engineer (35k-40k€ junior, up to 60k-70k€ senior), 
                fullstack lead developer JS (28k-38k€ junior, up to 65k-120k€ senior), 
                frontend developer (28k-38k€ junior, up to 60k-85k€ senior), 
                UI/UX designer (23k-35k€ junior, up to at 50k-73k€ senior), 
                Director of the information systems (70k-80k€ junior, up to 90k-120k€ senior), 
                cybersecurity engineer (42k-45k€ junior, up to 75k-80k€ senior), 
                Windows systems engineer (38k -40k€ junior, up to 53k-70k€ senior), 
                deep learning/AI engineer (35k-38k€ junior, up to 62k-70k€ senior).`,
                `Discover the salaries of tech professions in 2023: developers, UX designers, cybersecurity engineer, DSI, etc.`,
                `https://f.hellowork.com/blogdumoderateur/2023/06/Salaires-medians-grandes-villes.jpg`,
                `carlosGhosn`
            ]
        );

        const adminRoleId = uuidv4();
        const userRoleId = uuidv4();

        await connection.query("INSERT INTO roles (id, name) VALUES (?, ?)", [adminRoleId, "ADMIN"]);
        await connection.query("INSERT INTO roles (id, name) VALUES (?, ?)", [userRoleId, "USER"]);

        await connection.query("INSERT INTO roles_id(user_id, role_id) VALUES (?, ?)", [userId, adminRoleId]);
        await connection.query("INSERT INTO roles_id(user_id, role_id) VALUES (?, ?)", [userId2, userRoleId]);


        console.log("Utilisateur et post insérés avec succès !");
    } catch (error) {
        console.error(`Erreur lors de la création de la table : ${error}`);
        console.log(error.stack)
    } finally {
        if (connection) connection.end();
    }
}

createDB();