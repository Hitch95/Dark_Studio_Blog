import { NextResponse } from "next/server";
import { v4 as uuidv4 } from 'uuid';
import { db } from "@/utils/connectDB";
import bcrypt from 'bcrypt';

export async function POST(request) {
    const { username, email, password } = await request.json();

    try {
        // Génération d'un UUID pour l'ID de l'utilisateur
        const userId = uuidv4();
        console.log("UUID généré :", userId);

        // Hachage du mot de passe avec Bcrypt
        const hashedPassword = await bcrypt.hash(password, 10);
        console.log("Mot de passe haché :", hashedPassword);

        // Connexion à la base de données
        let dbconnection = await db.classicConnection();

        // Insertion de l'utilisateur dans la table users
        const insertQuery = `
             INSERT INTO users (id, username, email, password)
             VALUES (?, ?, ?, ?)
         `;
        const values = [userId, username, email, hashedPassword];

        // Exécution de la requête d'insertion
        await dbconnection.execute(insertQuery, values);

        console.log("Utilisateur inséré avec succès !");

        return new NextResponse("User has been created", {
            status: 201,
        });
    } catch (error) {
        console.error("Erreur lors de la création de l'utilisateur :", error);
        return new NextResponse(error.message, {
            status: 500,
        });
    }
}
