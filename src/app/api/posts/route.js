import { NextResponse } from "next/server";
import { db } from "@/utils/connectDB";
import { v4 as uuidv4 } from "uuid";
import { Session } from "next-auth";


export const GET = async (request) => {
    const url = new URL(request.url);

    const id = url.searchParams.get("id");

    try {
        const connection = await db.classicConnection();
        console.log("Connected to the database");

        let query = "SELECT * FROM posts";
        let params = [];

        if (id) {
            query += " WHERE id = ?";
            params.push(id);
        }

        const [rows] = await connection.execute(query, params);
        const posts = rows.map((row) => ({
            id: row.id,
            title: row.title,
            description: row.description,
            image: row.image,
            // Add other properties here based on your data structure
        }));
        console.log("Retrieved posts:", posts);

        connection.end();
        console.log("Disconnected from the database");

        return new NextResponse(JSON.stringify(posts), { status: 200 });
    } catch (err) {
        console.error("Database Error:", err);
        return new NextResponse("Database Error", { status: 500 });
    }
};




export const POST = async (request, session) => {
    // Utilisez l'objet de session passé en paramètre
    const { data } = session;
    const { user } = data;
    const { email } = user;

    const body = await request.json();

    const { title, description, content, image } = body;
    const id = uuidv4();
    const user_id = user?.id;
    console.log(user_id);


    try {
        const connection = await classicConnection();

        const query = `
            INSERT INTO posts (id, user_id, title, description, content, image)
            SELECT ?, users.id, ?, ?, ?, ? FROM users WHERE users.id = ?
        `;
        const params = [id, title, description, content, image, user_id];

        // Vérifier les valeurs undefined et les remplacer par null
        const sanitizedParams = params.map((param) => (param !== undefined ? param : null));

        console.log("Connected to the database");

        await connection.execute(query, sanitizedParams);
        console.log("Post inserted:", { id, user_id, title, description, content, image });

        connection.end();
        console.log("Disconnected from the database");

        return new NextResponse("Post has been created", { status: 201 });
    } catch (err) {
        console.error("Database Error:", err);
        return new NextResponse("Database Error", { status: 500 });
    }
};
