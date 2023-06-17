import { NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";
import { db } from "@/utils/connectDB";
import bcrypt from "bcrypt";

export async function POST(request) {
    const { username, email, password } = await request.json();

    try {
        const userId = uuidv4();

        const hashedPassword = await bcrypt.hash(password, 10);

        let dbconnection = await db.classicConnection();

        const insertQuery = `
             INSERT INTO users (id, username, email, password)
             VALUES (?, ?, ?, ?)
         `;
        const values = [userId, username, email, hashedPassword];

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
