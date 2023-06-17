import { NextResponse } from "next/server";
import { db } from "@/utils/connectDB";
import { v4 as uuidv4 } from "uuid";


export const GET = async (request) => {
    const url = new URL(request.url);

    const username = url.searchParams.get("username");


    try {
        const connection = await db.classicConnection();
        console.log("Connected to the database. posts(GET)");

        let query = "SELECT * FROM posts";
        let params = [];

        if (username) {
            query += " WHERE username = ?";
            params.push(username);
        }

        const [rows] = await connection.execute(query, params);
        const posts = rows.map((row) => ({
            id: row.id,
            title: row.title,
            description: row.description,
            image: row.image,
            username: row.username
        }));
        console.log("Retrieved posts:", posts);

        connection.end();
        console.log("Disconnected from the database. posts(GET)");

        return new NextResponse(JSON.stringify(posts), { status: 200 });
    } catch (err) {
        console.error("Database Error:", err);
        return new NextResponse("Database Error", { status: 500 });
    }
};




export const POST = async (request, session) => {
    const body = await request.json();

    const { title, description, content, image, user } = body;
    const id = uuidv4();
    const user_id = user?.id;
    const username = user?.username;

    console.log(user_id);

    try {
        const connection = await db.classicConnection();

        const query = `
        INSERT INTO posts (id, user_id, title, description, content, image, username) VALUES (?, ?, ?, ?, ?, ?, ?)
        `;
        const params = [id, user_id, title, description, content, image, username];

        // Vérifier les valeurs undefined et les remplacer par null
        const sanitizedParams = params.map((param) => (param !== undefined ? param : null));

        console.log("Connected to the database");

        await connection.execute(query, sanitizedParams);
        console.log("Post inserted:", { id, user_id, title, description, content, image, username });

        connection.end();
        console.log("Disconnected from the database");

        return new NextResponse("Post has been created", { status: 201 });
    } catch (err) {
        console.error("Database Error:", err);
        return new NextResponse("Database Error", { status: 500 });
    }
};



export const PUT = async (request, session) => {
    const { id } = request.params;
    const body = await request.json();

    const { title, description, content, image, user } = body;
    const user_id = user?.id;
    const username = user?.username;

    try {
        const connection = await db.classicConnection();

        const query = `
        UPDATE posts
        SET title = ?, description = ?, content = ?, image = ?, user_id = ?, username = ?
        WHERE id = ?
      `;
        const params = [title, description, content, image, user_id, username, id];

        // Vérifier les valeurs undefined et les remplacer par null
        const sanitizedParams = params.map((param) => (param !== undefined ? param : null));

        console.log("Connected to the database");

        await connection.execute(query, sanitizedParams);
        console.log("Post updated:", { id, title, description, content, image, user_id, username });

        connection.end();
        console.log("Disconnected from the database");

        return new NextResponse("Post has been updated", { status: 200 });
    } catch (err) {
        console.error("Database Error:", err);
        return new NextResponse("Database Error", { status: 500 });
    }
};